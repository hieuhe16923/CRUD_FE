---
applyTo: '**'
---
1. Drag and Drop Image Repositioning
Goal: Allow users to drag and drop images to reorder them. When an image is dragged over other input fields, no image link or strange characters should be added to those fields.
Implementation:
Use the HTML5 Drag and Drop API. You can implement this without external libraries using React's useRef hook to track the dragged item.
Make list items draggable by adding the draggable prop.
Use onDragStart to store data about the item being dragged.
To prevent unwanted data transfer to other fields, use e.preventDefault() in the onDragOver event handler of those fields.
For more complex scenarios, consider using a library like react-dnd or react-beautiful-dnd.

3. Focus on Top of Page on Navigation
Goal: When a user clicks on pagination or navigates to a new page, the window should automatically scroll to the top.
Implementation:
Use the useEffect hook to trigger a scroll-to-top action whenever the page or relevant data changes.
Inside useEffect, call window.scrollTo({ top: 0, behavior: 'smooth' }); to smoothly scroll to the top of the page.
Alternatively, you can use a ref on a top-level element and call ref.current.scrollIntoView().


4. Automatic Focus on Validation Errors
Goal: When a form submission fails due to validation errors, automatically focus on the first invalid field in the order they appear.
Implementation:
When using a form library like react-hook-form, this is often the default behavior. Ensure the shouldFocusError option is set to true (which is the default).
The focus order is determined by the order in which the fields are registered.
If implementing custom validation, you can use a ref on each input field and programmatically call .focus() on the first field that has an error.

7. Loading Indicators
Goal: Provide visual feedback to the user during loading states.
Implementation:
Page Loading: Implement a top-level loading bar (slide bar) that appears when the entire page is loading or transitioning.
Data Loading: Use a state variable (e.g., isLoading) to conditionally render a loading spinner or icon while data is being fetched from an API.
Button Loading: When a button triggers an API call, disable the button and show a loading icon inside it to prevent multiple clicks and indicate that an action is in progress.

8. Clickable Email Links
Goal: When a user clicks on an email address, open the default email client to compose a new message.
Implementation:
Use an <a> tag with the href attribute set to mailto:.
You can also include a subject and body in the mailto: link.

9. Debounced API Calls for Search
Goal: When a user is typing in a search bar, delay the API call until they have stopped typing for a short period (e.g., 300 milliseconds) to avoid excessive API requests.
Implementation:
Debouncing is a technique that delays the execution of a function until a certain amount of time has passed without it being called.
You can create a custom useDebounce hook that uses setTimeout and clearTimeout to manage the delay.
Alternatively, you can use a library like lodash which provides a debounce function.

10. Dynamic Image Display
Goal: Display detailed images without fixed width and height. If an image doesn't fill the container, add a blurred gray background.
Implementation:
Use CSS to style the image container. Set the image's max-width and max-height to 100% to ensure it fits within the container while maintaining its aspect ratio.
For the background, you can have a parent div with a blurred version of the image as its background, and the main image centered on top.

13. Component Reusability
Goal: Follow the practice of breaking down the UI into reusable components for easier maintenance, consistency, and scalability.
Implementation:
Single Responsibility Principle: Each component should have a single, well-defined purpose.
Props for Customization: Use props to make components flexible and configurable.
Component Composition: Build complex components by combining simpler ones.
Documentation: Document reusable components, including their props and usage examples. Consider using tools like Storybook to create a living style guide.