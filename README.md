# My Application

This application is built using various custom components and libraries to ensure a responsive and reusable design. Below is a detailed description of the technologies and custom solutions used in the application.

# Production Link U can See From It

    https://bronto-24-assessment.vercel.app/

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mohamedadel15/Bronto-24-assessment.git
   cd Bronto-24-assessment
    npm install
    npm run dev
   ```

## Technologies Used

- **Shadcn ui**: A UI library used for building the user interface components.
- **Custom Grid System**: A custom grid class was created to ensure responsiveness across all screen sizes without the need for specific breakpoints like `md`, `lg`, `sm`.
  such as :-
  gridTemplateColumns: {
  'custom-300': 'repeat(auto-fit, minmax(300px, 1fr))',
  },
- **Custom Components**: Various custom components were created to avoid repetition and ensure a clean and maintainable codebase.

### Environment Setup

Provide details on environment variables and setup.

````markdown
## Environment Setup

To run the app, you need to set up the following environment variables:

```bash
# .env file

NEXT_PUBLIC_BASE_URL= https://dv2.brontosolutions.com:8000/assignment

### Security Considerations
Discuss security measures, and mention the issue with `process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';`.

## Security Considerations

To bypass SSL certificate errors during development, we used:
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

* this solution is not secure pleas set ssl cert

```
````
