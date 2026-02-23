import { useState } from "react";
import Popup from "../atoms/Pup";
import { useForm } from "@formspree/react";

interface FeedbackPopupProps {
  show: boolean;
  onClose: () => void;
}

export default function FeedbackPoup({ show, onClose }: FeedbackPopupProps) {
  const [state, handleSubmit] = useForm("xldjjeyy"); // Obtén el ID de Formspree
  const [currentTime] = useState(new Date());

  if (state.succeeded) {
    onClose();
  }

  return (
    <div>
      {show && (
        <Popup show={show} onClose={onClose}>
          <div className="flex flex-col gap-4">
            <p className="text-gray-600">
              {currentTime.getHours()}:{currentTime.getMinutes()}
              {currentTime.getHours() > 12 ? <span>PM</span> : <span>AM</span>}
            </p>
            <form onSubmit={handleSubmit}>
              <textarea
                name="message"
                className="w-full h-32 p-2 border rounded-md"
                placeholder="Enter your feedback here..."
              />
              <button
                type="submit"
                disabled={state.submitting}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
              >
                {state.submitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
}
