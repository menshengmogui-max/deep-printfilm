#   Videos BY AI   一站式短剧平台

Make Moives by AI

中文[中文手册](https://github.com/yuanzhongqiao/deep-printfilm/blob/main/readme-cn.md)


Short videos by AI :  www.printfilm.com

Films  Moive and Drama  by   PrintFilm-Pro

Windows Application OR Website

Windows : set ip file : download the file[https://github.com/yuanzhongqiao/deep-printfilm/archive/refs/tags/PrintFilmPro-V-0.8.03.zip]

https://github.com/yuanzhongqiao/deep-printfilm/archive/refs/tags/PrintFilmPro-V-0.8.03.zip


# Print Film English Manual
## Client Download Attempt

### 📖 Project Introduction
Print Film Pro is an AI-powered one-stop platform for generating short videos and dynamic comics. For generating short videos with a single sentence, visit www.printfilm.com; the source code is available at https://github.com/yuanzhongqiao/printfilm.

To produce short dramas, you need Print Film Pro.

This project aims to achieve the goal of industrialized content production, enabling "one-sentence generation of complete videos." It provides creators with a fully automated solution from inspiration input to finished product output.

### Windows Client
**AI Short Drama Setup**

Link: https://pan.baidu.com/s/1xbaJRdV0kF6XNDbLX8Y5dA Extraction Code: bk4r -- Shared by a Baidu Netdisk Super Member v4

### Project Overview
Print Film Pro is positioned as an AI-driven one-stop platform for generating short videos and dynamic comics. Its core function is to automatically convert textual creativity into high-quality animated content with consistent characters, continuous scenes, and controllable shots. By deeply integrating various advanced AI models, the system constructs a standardized content creation pipeline, significantly improving video production efficiency and controllability.

This platform is suitable for scenarios such as short video creation, mass production of dynamic comics, creative prototype verification, and industrialized content factories for MCN agencies. It aims to address the shortcomings of traditional Text-to-Video methods in terms of narrative coherence and visual stability.

### Core Philosophy
Print Film Pro abandons the randomness-dependent "lottery-style" generation mode and adopts an industrialized Script-to-Asset-to-Keyframe process instead:

- **Script-Driven**: Based on structured scripts to ensure clear narrative logic.
- **Asset Constraints**: Ensure visual consistency through character reference images and scene concept designs.
- **Keyframe Control**: Introduce the keyframe paradigm from animation production to precisely control start and end frames, and utilize AI for smooth interpolation.

This methodology emphasizes fine-grained management of the creative process, enabling AI to serve not only as a generation tool but also as a predictable and controllable intelligent director assistant.

### Target Audience
- **Content Creators**: Quickly transform textual ideas into visual works.
- **Dynamic Comic Producers**: Mass-produce serialized content with a consistent style.
- **AI Video Researchers**: Explore controllable generation and multimodal collaboration mechanisms.
- **MCN Agencies and Content Factories**: Achieve systematic and industrialized video content production.

### 🚀 Quick Start
This section will guide you through the simplest deployment path for Print Film Pro, helping you run and access the system in a short time.

#### Environment Preparation
Before deployment, ensure your device meets the following minimum requirements:

- Node.js ≥ 18 (for local development)
- Docker (recommended for production environment deployment)
- It is recommended to use a modern browser (such as Chrome, Edge, or Firefox) to access the front-end interface.

#### Deployment Method Selection
Print Film Pro offers multiple deployment options, which users can choose based on their actual needs:

| Method | Applicable Scenario | Command |
| --- | --- | --- |
| Local Development | Development and debugging | npm run dev |
| Docker Compose (Recommended) | Production deployment | docker-compose up -d --build |
| Manual Docker | Custom configuration | docker build && docker run |

Among them, Docker Compose deployment is strongly recommended for non-technical users or production environments due to its strong environment isolation and simple dependency management.

#### Initial Access
After completing the deployment, follow these steps to start the service:

1. Clone the project repository:
```bash
git clone https://github.com/yuanzhongqiao/Print Film Pro.git
cd Print Film Pro
```
2. Start the service using Docker Compose:
```bash
docker-compose up -d --build
```
3. Open http://localhost:3005 in your browser to access the application.

Upon first access, the system will prompt you to enter a GitCC API Key to complete the initialization configuration.

### 🎨 Core Functional Modules
Print Film Pro divides content creation into four stages, forming a closed-loop workflow, with each stage having a clear functional positioning and interaction logic.

#### Phase 01: Script and Storyboard
This stage is responsible for converting raw textual creativity into structured shot scripts, laying the foundation for subsequent generation.

- **Intelligent Script Disassembly**: Supports inputting novel paragraphs or outline texts. AI automatically analyzes plot development, character appearances, and emotional changes, and converts them into standard script formats.
- **Visual Translation**: Automatically converts textual descriptions into prompts suitable for Midjourney or Stable Diffusion, facilitating image generation.
- **Rhythm Control**: Users can set target durations (such as a 30-second trailer or a 3-minute short drama), and the system will plan shot density and transition frequency accordingly.

Additionally, it supports manual editing of character visual features, action descriptions, and dialogue content to ensure artistic expression accuracy.

#### Phase 02: Assets and Casting
This stage focuses on the creation and management of visual assets to ensure consistency of characters and scenes throughout the video.

- **Character Consistency Guarantee**:
  - Automatically generate standard character reference images, including front, side, and expression details.
  - Support multiple costume settings (such as casual wear, combat attire, injured state), and maintain facial features unchanged through Base Look technology.
- **Scene Concept Design**: Generate concept images with unified lighting and artistic styles for each major scene to ensure visual coordination among all shots.

All assets are saved in the local IndexedDB database, eliminating the need to upload to a server and ensuring user privacy and security.

#### Phase 03: Director's Workshop
This is the core control center of the entire creative process, where users precisely arrange each frame of the picture.

- **Grid-based Storyboard Management**: Display all shots in a two-dimensional grid format, supporting drag-and-drop to adjust order and view progress.
- **Precise Control of Start and End Frames**: Users can define start frames and optional end frames for each shot, thereby controlling character postures and camera movements.
- **Context-Aware Generation**: AI reads the current scene and character-specific costumes during generation to prevent identity confusion or style drift.
- **Support for Veo Model for Image-to-Video and Keyframe Interpolation**: Invoke the Veo model to achieve transitions from static images to dynamic videos, supporting high-speed generation in landscape mode.

This module realizes the transition from "passively accepting results" to "actively directing control," granting users true creative dominance.

#### Phase 04: Final Export
After completing the generation of all shots, enter the final result integration stage.

- **Timeline Preview of Generated Results**: Display the splicing effect of various segments in a timeline format, supporting frame-by-frame playback and jumping.
- **Real-time Tracking of Rendering Progress**: Show the generation status (pending, in progress, completed) of each shot, facilitating monitoring of the overall process.
- **Export High-definition Keyframes and MP4 Segments for Post-production**: Support packaging and downloading all resources, which can be used for professional post-production operations such as adding sound effects and embedding subtitles in Adobe Premiere or After Effects.

### ⚙️ Technical Architecture
This section analyzes the underlying implementation mechanism of Print Film Pro, revealing how it efficiently integrates front-end frameworks and AI models.

#### Front-end Technology Stack
The system is built with a modern Web technology stack to create a high-performance user interface:

- **React 19 + Tailwind CSS**: Build responsive UIs, following Sony's industrial design style to enhance the operating experience.
- **Vite Build Tool**: Achieve extremely fast hot updates and production builds.
- **TypeScript Type System**: Enhance code maintainability and development efficiency.

The entire front-end project runs entirely in the browser environment without relying on any remote back-end services.

#### AI Model Integration
Print Film Pro schedules multiple cutting-edge AI models through a unified interface, forming a complete multimodal generation chain:

| Function | Model | Purpose |
| --- | --- | --- |
| Textual Logic | gpt-5.1 | Script analysis and structured disassembly |
| Image Generation | gemini-3-pro-image-preview | Quickly draw character and scene concept images |
| Video Generation | veo_3_1_i2v_s_fast_fl_landscape / sora-2 | Keyframe interpolation and image-to-video conversion |
| Alternative Models | GPT-5.2, Claude 3.5 Sonnet, Nano Banana Pro | Provide diverse options |

All AI capabilities are accessed through the GitCC API, which is compatible with the OpenAI protocol and supports one-click switching between different models, lowering the usage threshold.

#### Data Storage
The system uses the browser's built-in IndexedDB to achieve local data persistence:

- All project data (including scripts, assets, configurations) are saved on the user's local device.
- No registration or uploading of sensitive information is required, thoroughly protecting user privacy.
- Support offline viewing of generated content, but generation tasks requiring external API calls cannot be executed.

#### Deployment Architecture
Print Film Pro adopts a containerized deployment solution to ensure cross-platform compatibility and ease of use:

- **Docker + docker-compose.yaml**: Define service dependencies and network configurations.
- **Nginx Container Exposes Service Ports**: Map front-end static resources to http://localhost:3005.
- **Support for .env Environment Variable Configuration**: Allow customization of API addresses, ports, and other parameters.

This architecture enables both developers and ordinary users to complete deployment in just a few minutes.

### 💡 Usage Process Guide
The following is a step-by-step guide to a complete creative process, helping you produce a short film from scratch.

#### Step 1: Obtain and Configure the API Key
- Visit api.gitcc.com to register an account.
- Create a new API Key and copy the key.
- Paste the key in the settings page of Print Film Pro and save it.

This key is used to call AI model services on the GitCC platform and is a prerequisite for the normal operation of the system.

#### Step 2: Input Story Ideas
- Enter Phase 01: Script and Storyboard.
- Fill in your story concept in the input box, for example: "A programmer travels back in time to ancient times and changes the world with code."
- Click the "Generate Storyboard" button and wait for AI to automatically disassemble it into a shot script.
- The system will output a structured script containing scene divisions, character actions, and emotional annotations.

#### Step 3: Generate Character and Scene Assets
- Switch to Phase 02: Assets and Casting.
- Generate standard reference images for each main character and configure multiple costumes for them (such as modern wear, ancient costumes, combat forms).
- Generate concept design images for key scenes (such as ancient marketplaces, palaces) to unify lighting and artistic styles.
- All assets will serve as visual anchors in subsequent generation to ensure consistency.

#### Step 4: Set Keyframes and Generate Animations
- Enter Phase 03: Director's Workshop.
- Select corresponding start frame images for each shot and define end frames if necessary.
- Submit generation requests in batches, and the system will invoke the Veo model to complete video interpolation between keyframes.
- During generation, you can view the task queue and progress bar in real-time on the interface.

#### Step 5: Preview and Export Results
- Switch to Phase 04: Final Export.
- Preview the splicing effect of the complete video segments in the timeline panel.
- Click the "Export Resource Package" button to download a compressed file containing high-definition keyframes and MP4 video segments.
- The exported resources can be imported into professional editing software for final synthesis, completing operations such as adding music, voiceovers, and subtitles.

### 🔧 Frequently Asked Questions (FAQ)
The following are answers to frequently asked questions to help you quickly troubleshoot usage obstacles.

#### Q1: How do I obtain a GitCC API Key?
A: Visit api.gitcc.com to register an account, then create and copy an API key in the personal center.

#### Q2: Does it support offline operation?
A: It does not support completely offline operation because the system relies on external AI model APIs; however, all user data is saved in the local IndexedDB to ensure privacy and security.

#### Q3: Why is Docker deployment recommended?
A: Containerized deployment can avoid Node.js version conflicts and dependency issues, enabling one-click startup and suitable for users without a technical background.

#### Q4: How can I contribute code?
A: Fork this repository → create a feature branch → submit a Pull Request → wait for review and merging. Please follow the Conventional Commits submission specifications.

### 📞 Get Help
If you encounter problems or wish to participate in community exchanges, please obtain support through the following channels:

- **GitHub Issues**: Report bugs or propose feature suggestions.
- **Project Wiki**: Consult advanced tutorials and best practices.
- **Community Groups**: Scan the code to join the official exchange group and interact and share with other creators.
