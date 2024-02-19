import { useEffect } from "react";

export const useDisableNumberInputScroll = () => {
  // Use the useEffect hook to manage side effects
  useEffect(() => {
    // Define a function to prevent the default scroll behavior
    const handleWheel = (e: any) => {
      e.preventDefault();
    };

    // Find all number input elements in the document
    const numberInputs = document.querySelectorAll('input[type="number"]');

    // Attach the handleWheel function as an event listener to each number input
    numberInputs.forEach((input) => {
      input.addEventListener("wheel", handleWheel, { passive: false });
    });

    // Clean up by removing the event listeners when the component unmounts
    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener("wheel", handleWheel);
      });
    };
  }, []); // The empty dependency array ensures that this effect runs once, like componentDidMount
};

export default useDisableNumberInputScroll;
