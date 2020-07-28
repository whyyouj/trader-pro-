# Preview

Here is the [Live Demo](https://mernapp-startuptemplate.herokuapp.com) of project

# Description

A template for quickly starting MERN project with Redux & Material UI having following features:

- SignIn/SignUp
- Authentication & Authorization with JWT
- Email Verification
- Reset Password Request
- User Panel with easily customizable NavBar and SideMenu

## Major Dependencies of project

### Frontend

- React
- Redux
- Material UI

### Backend

- NodeJs
- Express
- Mongoose

# Getting Started

### Clone Repository

```bash
git clone https://github.com/ShariqBinShoaib/MERN-App-Startup-Template.git

```

### Install Dependencies

```bash
cd <Project-Path>

npm i && cd client && npm i

```

### Add `.env` file

Before running your project add `.env` file in project root with following variables:

```
- GMAIL_USER=<your_gmail_account_email_address>
- GMAIL_PASS=<your_gmail_account_password>
- jwtPrivateKey=<secret_key_for_jwt>  For authentication & authorization
- tokenKey=<secret_key_for_token> For email verification and reset password request
- MONGO_URI=<mongo_cloud_uri>

```

**Note:** If you have mongodb locally installed you can leave MONGO_URI empty.

### Run Project

```bash
cd ..

npm run dev

```

## Contribution

Any suggestions, recommendations or contributions are welcome.
Also, if you see any bad practices in code, kindly pointing it out.
