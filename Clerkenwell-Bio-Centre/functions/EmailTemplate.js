const EmailTemplate = (
  userName,
  selectedConditions,
  selectedTrialOptions,
  email,
  phone
) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Congratulations! You Won the Auction!</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
            }
        
            .container {
              width: 600px;
              margin: 50px auto;
              text-align: center;
              padding: 30px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
            }
        
            .bg-img {
              width: 100%;
              height: 200px;
              object-fit: cover;
              position: absolute;
              top: -50px;
              left: 0;
              z-index: -1;
              padding-bottom: 28px;
            }
        
            h1 {
              font-size: 24px;
              margin-bottom: 15px;
            }
        
            p {
              font-size: 16px;
              line-height: 1.5;
              margin-bottom: 10px;
            }
        
            .item-image {
              width: 300px;
              height: 200px;
              object-fit: cover;
              margin: 0 auto;
              display: block;
              margin-top: 15px;
              margin-bottom: 15px;
              border-radius: 10px;
            }
        
            .payment-button {
              background-color: #f77171; /* Red */
              border: none;
              color: white;
              padding: 10px 20px;
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 16px;
              margin: 20px auto;
              cursor: pointer;
              border-radius: 5px;
            }
            
            .payment-button:hover {
              background-color: #ef4444; /* Red hover */
              color: white;
            }
            
            .payment-button:link,
            .payment-button:visited {
              color: white; /* Set default text color */
            }
          </style>
        </head>
      
        <body>
          <div class="container">
            <img src="https://images.unsplash.com/photo-1674397167590-e8133e1c0b09?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" class="bg-img">
            <h1>Congratulations, Admin</h1>
            <p>We're excited to inform you that a new booking has been made on your platform. Here are the details:</p>
            <p><b>Buyer's Name:</b> ${userName}</p>
            <p><b>Selected Conditions:</b> ${selectedConditions.join(", ")}</p>
            <p><b>Selected Trial Options:</b> ${selectedTrialOptions.join(
              ", "
            )}</p>
            <p><b>Buyer's Email:</b> ${email}</p>
            <p><b>Buyer's phone:</b> ${phone}</p>
            <br/>
            <p>This notification is to keep you informed about the recent booking on your platform. You may want to review the details for record-keeping purposes or to manage any necessary logistics related to the booking.</p>
            <p>Thank you for choosing us! We hope you have a wonderful experience.</p>
            <p>Sincerely,</p>
            <p>Clerkenwell Bio Centre</p>
          </div>
        </body>
      </html>
      `;
};

module.exports = EmailTemplate;
