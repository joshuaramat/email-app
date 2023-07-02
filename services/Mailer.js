const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super(); // Call the constructor of the Mail class

    this.sgApi = sendgrid(keys.sendGridKey) // returns an object that we can use to communicate with SendGrid API

    this.from_email = new helper.Email('ramatjoshua@gmail.com')
    this.subject = subject
    this.body = new helper.Content('text/html', content)
    this.recipients = this.formatAddresses(recipients)

    // Inherited from helper.Mail
    this.addContent(this.body)
    this.addClickTracking() 
    this.addRecipients()
  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email)
    })
  }

  // SendGrid specific function
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings()
    const clickTracking = new helper.ClickTracking(true, true)

    trackingSettings.setClickTracking(clickTracking)
    this.addTrackingSettings(trackingSettings)
  }

  // SendGrid specific function
  addRecipients() {
    const personalize = new helper.Personalization()

    this.recipients.forEach(recipient => {
      personalize.addTo(recipient)
    })

    this.addPersonalization(personalize)
  }

  // Send the email to SendGrid API
  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send', // SendGrid API route
      body: this.toJSON() // Convert the Mailer object to JSON
    })

    const response = await this.sgApi.API(request) // Send the request to SendGrid API
    return response
  }
}

module.exports = Mailer;