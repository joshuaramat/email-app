const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey.find({ _user: req.user.id }).select({ 
        recipients: false 
      });

      res.send(surveys);
    } catch (err) {
      console.error(err); // Log the error for debugging purposes
      res.status(500).send({ error: 'An error occurred while trying to fetch the surveys.' });
    }
  });


  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send(
      "Right on! We appreciate your feedback. It really helps us understand how we can do better. Thank you!"
    );
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');
    
    _.chain(req.body)
      .map(({ email, url }) => {
        try {
          const match = p.test(new URL(url).pathname)

          if (match) {
            return {
              email,
              surveyId: match.surveyId,
              choice: match.choice
            }
          }
        } catch (error) {
          console.error(`Invalid URL: ${url}`)
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          }
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // surveyTemplate(survey) is the HTML content of the email
    const mailer = new Mailer(survey, surveyTemplate(survey)); 

   try { 
      await mailer.send(); // Send the email to SendGrid API
      await survey.save(); // Save the survey to the database
      req.user.credits -= 1; // Deduct 1 credit from the user
      const user = await req.user.save(); // Save the user to the database

      res.send(user); // Send the updated user back to the client
    } catch (error) {
      res.status(422).send({ error: "Oops, something seems off. Could you double-check your information and give it another shot?" });
    }
  });
};