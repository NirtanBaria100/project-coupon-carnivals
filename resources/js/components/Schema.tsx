import { useEffect } from "react";

function Schema({ data }: { data: object }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(data, null, 2);
    document.head.appendChild(script);

    // Optional cleanup if component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, [data]);

  return null; // No JSX output
}

export { Schema };
