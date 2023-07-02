const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send(
      "Right on! We appreciate your feedback. It really helps us understand how we can do better. Thank you!"
    );
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