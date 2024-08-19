
# **FlashMind - AI-Powered Flashcard Generator**

![FlashMind Logo](public/logo.png)

## 🚀 **Overview**

FlashMind is an AI-powered SaaS application designed to help users generate flashcards from any text, study efficiently, and keep track of their learning progress. By leveraging the power of AI, particularly OpenAI's GPT model, FlashMind streamlines the process of creating study aids, making it easier and faster for users to focus on learning. Whether it's summarizing dense material into flashcards or keeping track of what has been learned, FlashMind is a perfect companion for students and learners alike.

---

## 📚 **Features**

- **AI-Powered Flashcard Generation (OpenAI)**: Automatically generate flashcards from any text using the OpenAI API. The AI intelligently summarizes content and creates question-and-answer pairs.
- **Study Progress Tracking**: Keep track of the flashcards you've studied and measure your learning progress.
- **Subscription Plans**: Access advanced features by upgrading to Premium or Pro plans, with limitations enforced after generating 5 flashcards.
- **User Authentication**: Secure sign-up and login powered by Clerk.js.
- **Save Flashcards**: Save generated flashcards to your account and access them anytime.
- **Responsive Design**: Works across all device sizes and provides a seamless experience.
- **Payment Integration**: Stripe payment gateway for upgrading to premium plans after generating a certain number of flashcards.
  
---

## 🛠️ **Tech Stack**

- **Frontend**: 
  - [Next.js](https://nextjs.org/) - A React-based framework for building web applications.
  - [Material-UI](https://mui.com/) - A React component library for faster and easier web development.
  - [Clerk.js](https://clerk.dev/) - User management for Next.js applications (sign-up, login, user sessions).

- **Backend**:
  - [Firebase Firestore](https://firebase.google.com/docs/firestore) - A NoSQL database for storing user-generated flashcards and collections.
  - [OpenAI API](https://openai.com/api/) - Used to generate AI-powered flashcards from text input.
  - [Node.js](https://nodejs.org/) - JavaScript runtime used to build server-side functionality.
  - [Stripe](https://stripe.com/) - Payment integration for subscriptions and premium features.

- **Deployment**:
  - [Vercel](https://vercel.com/) - Platform for frontend deployment and hosting.

---

## ⚙️ **Folder Structure**

```bash
flashMind/
│
├── app/
│   ├── api/                # Serverless functions and API routes
│   ├── generate/           # Flashcard generation page
│   ├── pricing/            # Pricing page
│   ├── result/             # Payment result page
│   ├── sign-in/            # Sign-in page
│   ├── sign-up/            # Sign-up page
│   ├── layout.js           # Global layout
│   └── page.js             # Home page
├── node_modules/           # Project dependencies
├── public/                 # Static assets
├── utils/                  # Utility functions (including getStripe and OpenAI utils)
├── firebase.js             # Firebase configuration
├── jsconfig.json           # JS config
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## 🔧 **Getting Started**

Follow these instructions to set up and run the project locally.

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Vercel CLI](https://vercel.com/docs/cli) (optional for deployment)

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/flashMind.git
   cd flashMind
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project and add Firestore.
   - Add your Firebase credentials to `firebase.js`.

4. Add Stripe and OpenAI keys:

   - Create a `.env` file in the root directory and add your API keys:
     ```env
     STRIPE_SECRET_KEY=your_stripe_secret_key
     OPENAI_API_KEY=your_openai_api_key
     ```

5. Run the app locally:

   ```bash
   npm run dev
   ```

6. Visit the app in your browser at `http://localhost:3000`.

---

## 🛠️ **Deployment**

To deploy the app to Vercel:

1. Ensure all your changes are committed and pushed to your GitHub repository.
2. Run the following command to deploy:

   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment setup.

4. You can now access your deployed app on Vercel.

---

## 💡 **Key Functionalities**

- **Flashcard Generation with OpenAI**: Users can input text and let OpenAI's GPT model generate flashcards automatically. This feature intelligently breaks down content and creates question-answer pairs for study efficiency.
- **Subscription Limitation**: Users can generate up to 5 flashcards before being prompted to upgrade to a premium plan.
- **Payment Integration**: After generating 5 flashcards, users are redirected to the pricing page, where they can subscribe to advanced plans using Stripe.
- **Secure Login**: Clerk.js handles user authentication, making it easy to sign up, log in, and manage sessions.
- **Study Tracking**: Users can keep track of their saved flashcards and monitor progress.

---

## 🤝 **Contributing**

Contributions are welcome! Feel free to open issues or submit pull requests for any improvements or bug fixes.

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎨 **Screenshots**

### **Home Page**
![Home Page](public/screenshots/homepage.png)

### **Generate Flashcards**
![Generate Flashcards](public/screenshots/generate.png)

### **Pricing Page**
![Pricing Page](public/screenshots/pricing.png)

---

## 👨‍💻 **Author**

- **Rohan Mathew Alex** - [GitHub Profile]([https://github.com/your-username](https://github.com/rohanmathewalex))
