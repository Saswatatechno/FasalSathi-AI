# FasalSathi AI — Project Context

## 1. Project Identity

**Project Name:** FasalSathi AI

**Tagline:**  
Smart Crop Advisory & Farm Resource Optimization for Smallholder Farmers

**Project Type:**  
24-Hour Hackathon MVP

**Primary Goal:**  
Build a practical, modular agricultural advisory platform that helps smallholder farmers make better decisions related to crop health, crop selection, irrigation, fertilizer usage, and market prices.

---

# 2. Project Background

FasalSathi AI is being developed as a solution for a 24-hour hackathon.

The project is intentionally scoped as a focused MVP.

The goal is NOT to build a complete enterprise agricultural platform within the hackathon.

The goal is to solve the four core problems specified in the hackathon problem statement with a functional, demonstrable, and well-structured prototype.

The project should prioritize:

> Working functionality > unnecessary complexity

The architecture must allow each major feature to be developed, tested, debugged, and improved independently.

---

# 3. Problem Being Solved

Smallholder farmers can face difficulties in making timely and informed decisions about:

- Identifying crop diseases and pests
- Selecting suitable crops for their soil and environmental conditions
- Deciding when irrigation is needed
- Understanding basic fertilizer requirements
- Comparing market prices before selling their produce

FasalSathi AI aims to bring these decision-support capabilities into a single, simple platform.

The system should convert technical agricultural data into understandable and actionable recommendations for farmers.

---

# 4. Core Objectives

The project has exactly FOUR primary objectives.

These four objectives define the core MVP scope.

## 4.1 Crop Disease / Pest Detection

The system should allow a farmer to upload an image of a crop or leaf.

The system should:

1. Accept the image.
2. Process the image.
3. Detect the possible disease or pest.
4. Provide a prediction confidence where supported.
5. Provide basic and understandable advisory information.

Conceptual flow:

```text
Crop / Leaf Image
       ↓
Image Processing
       ↓
Disease / Pest Detection Model
       ↓
Prediction
       ↓
Confidence
       ↓
Basic Advisory