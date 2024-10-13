# 📝 Confession App

A full-stack web application that allows users to anonymously share their confessions. The app is designed for a seamless user experience with a modern UI, mobile responsiveness, and efficient backend architecture using AWS services.

## ✨ Features

- 🔒 **Anonymous Confessions**: Users can share their thoughts without revealing their identity.
- 📜 **Pagination**: Efficient data handling for large numbers of confessions.
- 📱 **Mobile Responsive Design**: Optimized for use on various screen sizes.
- 🎨 **Good UI/UX**: Focused on providing a smooth and intuitive user experience.

## 🛠️ Tech Stack

### 🌐 Frontend
- ⚛️ **React.js**: Used for building the user interface.
- 🎨 **Tailwind CSS**: For styling the app with a modern and responsive design.
- 🚀 **AWS Amplify**: Hosting the frontend for fast and secure content delivery.

### 🏗️ Backend
- 🧩 **AWS Lambda (Serverless)**: Handles the business logic and interacts with the database.
- 🛣️ **AWS API Gateway**: Manages API routes to Lambda functions.
- 📦 **AWS Lambda Layers**: Common modules shared between Lambda functions.
- 💾 **DynamoDB**: Stores the confession data.

## 🏛️ Architecture Overview

The app follows a serverless architecture leveraging various AWS services:
1. 🎉 **Frontend**: The React.js app is hosted on AWS Amplify, providing fast and reliable static hosting.
2. 🔄 **Backend**: API requests are routed through AWS API Gateway to AWS Lambda functions. These functions interact with DynamoDB to store and retrieve confessions.
3. 📂 **Lambda Layers**: Used to share common code between different Lambda functions, improving code reusability and reducing deployment package sizes.

## 🚀 Getting Started

### ✅ Prerequisites

- 📦 **Node.js** and **npm** installed on your local machine.
- ☁️ **AWS Account**: Required for deploying backend services.

### ⚙️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Nidhi-Prakash/Confession-App
