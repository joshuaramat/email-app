const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>Join the conversation! Your thoughts matter to us.</h3>
          <p>Help us understand you better, just a click on 'yes' or 'no' would be super helpful!</p>
          <p>${survey.body}</p>

          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks">Yes</a>
          </div>

          <div>
            <a href="${keys.redirectDomain}/api/survey/thanks">No</a>
          </div>
        </div>
      </body>
    </html>
  `
};