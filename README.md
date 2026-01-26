# Luma 🌟

> *Illuminating the Social World for "Children from the Stars".*

![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Style-Tailwind_CSS-38B2AC)
![Accessibility](https://img.shields.io/badge/Focus-Accessibility_First-green)
![Privacy](https://img.shields.io/badge/Privacy-Local_Processing-red)
![Status](https://img.shields.io/badge/Status-MVP_Demo-orange)

---

## 📖 Project Background

**Luma** is a high-fidelity interactive web application designed to support children with Autism Spectrum Disorder (ASD) in developing emotion recognition skills.

Children with ASD are often poetically referred to as *"Children from the Stars"*—individuals who possess unique, beautiful perspectives but may find the unspoken rules of Earth's social interactions confusing. While systemizing abilities are often strong, the **Theory of Mind (ToM)**—the ability to attribute mental states to oneself and others—can be a challenge.

**Luma bridges this gap.** By combining **Gamification** with **ABA (Applied Behavior Analysis)** strategies, Luma breaks down complex facial expressions into learnable, discrete patterns, providing a safe, predictable environment for social-emotional learning.

---

## ✨ Key Features

The application is divided into two distinct modes: **The Kid's Space** (Adventure) and **The Parent's Lighthouse** (Guidance).

### 🚀 For Explorers (The Children)
*Context: A space exploration adventure where learning emotions lights up the galaxy.*

*   **🧩 Emotion Puzzle:** A deconstructionist approach to facial expressions. Children learn that "Happy" isn't just a feeling; it is a system of raised eyebrows and an upward curving mouth.
*   **🎭 Story Theater:** Contextual training based on Theory of Mind. Children are presented with social scenarios (e.g., "Ice cream fell down") and must infer the correct emotional reaction, moving beyond simple face matching to situational empathy.
*   **🦁 AR Magic Mirror (Simulation):** A safe space to practice facial mimicry. The app encourages children to mirror expressions using a "Lion Mask" avatar, utilizing a simulated confidence meter to provide positive reinforcement without the pressure of direct eye contact.

### ⚓ For Guardians (The Parents)
*Context: A data-driven dashboard to monitor progress and emotional health.*

*   **📊 The Lighthouse Dashboard:** Real-time data visualization using Radar Charts to track proficiency across specific emotions (Happy, Angry, Sad, Surprised).
*   **📝 Growth Journal:** A digital log based on the ABC (Antecedent-Behavior-Consequence) model. Parents can track daily moods, identify triggers (Noise, Routine Changes), and correlate them with training sessions.
*   **🔒 Privacy Core:** Luma is designed with a **Privacy-First** architecture. In the production roadmap, all facial recognition data is processed on the *Edge* (locally in the browser), ensuring no biometric data ever leaves the device.

---

## 🖼️ Screenshots

*<img width="2513" height="1302" alt="image" src="https://github.com/user-attachments/assets/79b23a7e-ae3c-45a7-9214-d2db9420a94d" />
*

---

## 🛠️ Technology Stack

Luma is built with a focus on performance, accessibility, and sensory safety.

*   **Frontend Framework:** React 19 (TypeScript).
*   **Styling:** Tailwind CSS.
    *   *Design Note:* The app utilizes a **Morandi Color Palette** (Low saturation, muted tones) to prevent sensory overload/over-stimulation, a critical UI/UX consideration for ASD applications.
*   **Icons:** Lucide React (Clean, rounded geometry).
*   **Visualization:** Recharts (Accessible data plotting).
*   **Architecture:**
    *   **Lifted State Management:** Real-time synchronization between Child interactions and the Parent Dashboard.
    *   **Component-Based:** Modular game engines (Puzzle, Mirror, Story) for easy scalability.

---

## 💿 Getting Started

To run the Luma MVP locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Hedy1Biblee/Luma.git
    cd luma
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open your browser to `http://localhost:5173` (or the port shown in your terminal).

---

## 🗺️ Future Roadmap

*   **👁️ Computer Vision Integration:** Replace the simulation in "Magic Mirror" with real-time TensorFlow.js Face Mesh tracking for actual expression verification.
*   **📄 IEP Reporting:** Generate downloadable PDF reports for therapists and teachers (Individualized Education Programs).
*   **🗣️ Voice Analysis:** Add tone-of-voice recognition training.
*   **☁️ Multi-User Support:** Secure cloud sync for usage across multiple devices (Tablets/Desktops).

---

*Luma © 2023 - Lighting the way.*
