# InterCar 3D Model Viewer

InterCar is a 3D car model viewer built with React and Three.js, allowing users to interact with car models in a dynamic virtual showroom environment. Users can view car models, open/close doors, upload new models, and change the environment lighting.

## Features

- **Interactive 3D Model Viewer**: Interact with car models in an immersive showroom environment.
- **Car Controls**: Open/close car doors with smooth animations and switch views between the inside and outside of the car.
- **Model Upload**: Users can upload their own `.gltf` or `.glb` car models to view them in the showroom.
- **Showroom Environment**: Stylish virtual showroom with dynamic lighting and reflection effects.
- **Lighting Control**: Adjust showroom lighting, including turning lights on/off, and changing colors.

## Technologies Used

- **Frontend**: React, Three.js, React Three Fiber, Tailwind CSS.
- **Tools**: Visual Studio Code, Blender (for 3D model manipulation).

## Setup Instructions

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js and npm
- React

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Zani10/Prototype-Three.js.git
   cd prototype-threejs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Access the Application**: Open [http://localhost:5173](http://localhost:5173) in your web browser.

## Features Overview

- **Interactive Controls**: 
  - Open/Close left and right car doors with a click.
  - Toggle between outside and inside views.
  - Smooth animations for door opening/closing and view transitions.
- **Upload 3D Models**: Upload `.glb` or `.gltf` files to view custom car models. Add a name to your uploaded models for easy identification.
- **Showroom Environment**:
  - Dynamic lighting that illuminates the car and reflects off the showroom floor.
  - Ability to toggle and change light settings in real-time.

## Folder Structure

```
|-- PROTOTYPE-THREEJS/
|   |-- node_modules/
|   |-- public/
|   |   |-- assets/
|   |       |-- studio_v1_for_car.glb
|   |       |-- vite.svg
|   |-- src/
|   |   |-- assets/
|   |   |   |-- react.svg
|   |   |-- components/
|   |   |   |-- Canvas.jsx
|   |   |   |-- InteractiveRoom.jsx
|   |   |   |-- ModelViewer.jsx
|   |   |   |-- ObjectList.jsx
|   |   |   |-- UploadModel.jsx
|   |   |-- hooks/
|   |   |-- pages/
|   |   |   |-- HomePage.jsx
|   |   |-- styles/
|   |   |-- utils/
|   |   |-- App.css
|   |   |-- App.jsx
|   |   |-- index.css
|   |   |-- main.jsx
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- postcss.config.js
|-- README.md
|-- tailwind.config.cjs
```

## Usage Instructions

1. **Viewing Models**: 
   - The 3D viewer takes up the entire screen for an immersive experience.
   - Controls are positioned in an intuitive layout for easy access.

2. **Upload Custom Models**:
   - Click on the `Choose File` button on the top-right to upload a `.glb` or `.gltf` file.
   - Enter a name for your model and hit the `Upload Model` button.

3. **Controls**:
   - **Left Door / Right Door**: Click to toggle each door. When active, buttons turn green.
   - **Views**: Switch between inside and outside views using the buttons at the bottom of the screen.

4. **Light Controls**:
   - Adjust the showroom lights to illuminate the car.
   - Control options are available for toggling individual light panels.

## Sources and References

- **React Three Fiber Documentation**: https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
- **Three.js Documentation**:
   - https://threejs.org/docs/
   - https://www.tutorialspoint.com/threejs/threejs_orbit_controls.htm 
- **React Drei**:
   - https://r3f.docs.pmnd.rs/getting-started/introduction 
- **Blender for 3D Models**: https://www.blender.org/
- **YouTube Tutorials**:
  - https://www.youtube.com/watch?v=kt0FrkQgw8w
  - https://www.youtube.com/watch?v=pUgWfqWZWmM
- **ChatGPT Chat link**:
  - https://chatgpt.com/share/673be65c-000c-800f-a86e-e9e7ade1bb05 

## Credit to 3D models
- https://sketchfab.com/3d-models/cartoon-sports-car-0fd87559642a41b7a7924876ad3e9399 from RCC Design ![image](https://github.com/user-attachments/assets/577e438e-edb7-42dd-9125-7b080971713e)
- https://sketchfab.com/3d-models/studio-v1-for-car-9c45d19a7d434e2ca1640d6d2146e895 from Velocity Motion ![image](https://github.com/user-attachments/assets/2f4aa35b-2be4-48ed-be45-8ad48bfc0f0c)

