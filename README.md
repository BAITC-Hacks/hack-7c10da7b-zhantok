# hack-7c10da7b-zhantok
Hackathon team repository for Zhantok
# MusicEdu AI

## HackAlem AI Hackathon

MusicEdu AI is an MVP platform for music education that helps businesses and educational organizations turn an initial idea or problem into a structured practical task for student teams.

The project is based on the HackAlem AI gamification case, where the quality of a business task is evaluated and tasks are published in an open catalog.

## Problem

Businesses often have practical problems but describe them in an incomplete or unclear way.

Student teams may be interested in solving these problems, but they need enough information about the task before preparing a proposal.

MusicEdu AI helps structure this process.

## Main Scenario

The MVP supports the following end-to-end flow:

1. A business representative creates a short task draft.
2. AI analyzes the draft and identifies missing information.
3. AI asks at least three relevant clarification questions.
4. The business provides additional information.
5. The system generates an editable task card.
6. The task receives a readiness score from 0 to 100.
7. The business can improve the task and increase its score.
8. The task can be published to the public catalog.
9. Student teams can browse published tasks.
10. A student team can submit a proposal.
11. The business representative can accept or reject proposals manually.

The system does not automatically assign teams to tasks.

## Music Education Focus

The platform is adapted to music education.

Example task:

> Improve regular practice habits of beginner piano students using an engaging digital learning experience.

Possible practical tasks may include:

- creating interactive music exercises;
- improving student practice motivation;
- designing gamified music-learning activities;
- analyzing student practice behavior;
- creating AI-assisted music theory exercises.

## Task Readiness Score

The task quality score is calculated from several dimensions:

| Criterion | Weight |
|---|---:|
| Context / Need | 20% |
| Data / Materials | 20% |
| Expected Result | 15% |
| Success Criteria | 15% |
| Constraints | 10% |
| Target Users | 10% |
| Business Contact / Feedback | 10% |
| **Total** | **100%** |

### Score Levels

| Score | Level |
|---|---|
| 0–39 | Draft |
| 40–69 | Working |
| 70–89 | Ready |
| 90–100 | Priority |

A low score does not prevent a task from being published.

## AI Role

AI is used to:

- analyze the initial task description;
- identify missing information;
- generate clarification questions;
- help create a structured task card;
- calculate or support the task readiness evaluation;
- suggest improvements to increase the score.

AI-generated information must remain editable and confirmable by the business representative.

AI does not automatically select or assign student teams.

## Main MVP Features

- Business task creation
- AI clarification questions
- Editable task card
- Transparent readiness score
- Score improvement
- Public task catalog
- Student team profiles
- Proposal submission
- Manual business decision
- End-to-end task workflow

## Expected Demo

The main demonstration will show:

1. Creating a weak music-education task description.
2. Answering AI clarification questions.
3. Improving the task score.
4. Publishing the task.
5. Viewing the task in the public catalog.
6. Submitting a proposal as a student team.
7. Accepting or rejecting the proposal as the business representative.

## Project Status

MVP development is in progress.

## Technology

The final technology stack and architecture will be documented here after implementation.

## Installation and Running

Installation and running instructions will be added after the project implementation is completed.

## Test Data

The MVP will use synthetic data for demonstration, including:

- business task drafts;
- structured task cards;
- student team profiles;
- student proposals.

## Limitations

This is a hackathon MVP.

The project does not aim to implement:

- complex authentication;
- real-time chat;
- notifications;
- calendar functionality;
- file storage;
- mobile application;
- automatic team assignment;
- ML model training or vector database infrastructure.

## Repository

HackAlem AI team repository:

`BAITC-Hacks/hack-7c10da7b-zhantok`