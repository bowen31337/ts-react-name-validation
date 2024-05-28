
# Name Validation Component Summary

This project demonstrates a React component with input validation using both inline (regex-based) and asynchronous (API-based) methods. The project uses TypeScript and React hooks for state management and validation logic. Additionally, it includes testing using Vitest and the React Testing Library.

## Key Features

- **Inline Validation:** Validates that the input contains only letters and spaces using a regex.
- **Asynchronous Validation:** Checks if the name exists by simulating an API call.
- **Debouncing:** Debounces the async validation to avoid unnecessary API calls on each keystroke.
- **Accessibility:** Uses ARIA attributes to improve accessibility.
- **Styling:** Includes basic styling for better user experience.
- **Testing:** Comprehensive tests using Vitest and React Testing Library.


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/name-validation-component.git
   cd name-validation-component
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   npm run dev
   ```

4. Run the tests:
   ```sh
   npx vitest
   ```

## Usage

The `NameValidationComponent` can be used in any React application. It uses the custom hook `useNameValidation` for validation logic.

