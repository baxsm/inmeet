# 🌟 inMeet - Simplify Scheduling! 🌟

Welcome to **inMeet**! ⏰ A modern and **streamlined meeting scheduling tool** inspired by the likes of Calendly. Share your availability, create event types, and let others schedule meetings with you effortlessly! 😎✨

---

## 🌐 Live Demo 🌐

Experience **inMeet** in action! 🎉 Check out the live version of the application:

🔗 **Live URL**: [inMeet Live Demo](http://localhost:3000)

Feel free to explore, create your own event types, and try scheduling meetings. It's all yours to test! 🚀

---

## 📖 Overview 📖

**inMeet** allows users to:

- 🌐 **Sign up or log in** using Google, GitHub, or custom credentials.
- 🛠️ **Create custom event types** tailored to their schedule.
- 📤 **Share a unique URL** where others can book meetings with them.
- 📅 **Track and manage** scheduled meetings in one place.

Say goodbye to the back-and-forth hassles of scheduling meetings! 🚀

---

## 🚀 Features 🚀

✔️ **Multiple Sign-In Options**: Sign in using Google, GitHub, or your own credentials. 🔑  
✔️ **Custom Event Types**: Create event types that match your workflow and preferences. ⚙️  
✔️ **Shareable Link**: Easily share your calendar availability via a unique URL. 🌐  
✔️ **Simple Scheduling**: Allow others to book meetings with just a couple of clicks. 🖱️  
✔️ **Elegant UI**: Sleek and user-friendly interface designed for ease of use. 🖌️

---

## 🛠️ Built Using 🛠️

🔸 **Next.js** for modern server-rendered React applications.  
🔸 **Supabase** for database management and security.  
🔸 **NextAuth.js** for seamless authentication.  
🔸 **Nylas** for powerful calendar and email integrations.  
🔸 **TailwindCSS** for beautiful and responsive styling.  
🔸 And a bunch of other libraries and tools for the best performance and DX! ✨⚡

---

## 🔧 Local Setup 🔧

Clone the repo and follow these steps to set up **inMeet** locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/baxsm/inmeet.git
   cd inmeet
   ```

2. **Install Dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set Up Environment Variables**:  
   Create a `.env.local` file with the following variables:

   ```plaintext
   NEXT_PUBLIC_APPLICATION_URL=http://localhost:3000
   AUTH_SECRET=your_auth_secret

   AUTH_GITHUB_ID=your_github_client_id
   AUTH_GITHUB_SECRET=your_github_client_secret

   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret

   DATABASE_URL=your_database_url
   DIRECT_URL=your_direct_database_url

   NYLAS_API_KEY=your_nylas_api_key
   NYLAS_API_URI=https://api.us.nylas.com
   NYLAS_CLIENT_ID=your_nylas_client_id

   UPLOADTHING_TOKEN=your_uploadthing_token
   UPLOADTHING_SECRET=your_uploadthing_secret
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Your app should now be running at `http://localhost:3000` 🎉

---

## 🎨 Tech Stack & Libraries 🎨

**Frontend** 🖥️

- Next.js
- React
- TailwindCSS

**Backend** 🔧

- Supabase
- NextAuth.js
- Prisma

**Integrations** 🔗

- Nylas for scheduling APIs
- Uploadthing for file uploads

---

## 📸 Screenshots 📸

Explore the functionality and design of **inMeet** at a glance! 🚀

### 🏠 Landing Page

The clean and minimal homepage welcoming users to the ultimate scheduling experience.  
![Landing Page](/public/readme1.png)

---

### 🔑 Authentication

Seamless login options via Google, GitHub, or custom credentials.  
![Authentication](/public/readme2.png)

---

### 📋 Dashboard - Overview

Your centralized hub for managing all events and meetings.  
![Dashboard](/public/readme3.png)

---

### ⚙️ Dashboard - Event Types

Create, customize, and manage different event types based on your needs.  
![Dashboard - Event Types](/public/readme4.png)

---

### 📅 Dashboard - Upcoming Meetings

View and track all your scheduled meetings in one convenient location.  
![Dashboard - Upcoming Meetings](/public/readme5.png)

---

### 🕒 Dashboard - Your Availability

Set up and manage your availability preferences for event booking.  
![Dashboard - Your Availability](/public/readme6.png)

---

### 🕒 Dashboard - Settings

A deeper look at your profile.  
![Dashboard - Your profile settings](/public/readme7.png)

---

### 📆 Booking - Select Time

Effortlessly let others choose a time that fits your schedule.  
![Booking - Select Time](/public/readme8.png)

---

### ✍️ Booking - Enter Information

Gather essential details like name and email for meeting attendees.  
![Booking - Enter Name and Email](/public/readme9.png)

---
