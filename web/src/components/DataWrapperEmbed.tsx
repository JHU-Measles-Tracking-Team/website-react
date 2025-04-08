import React, { useEffect, useRef } from "react";

interface DataWrapperEmbedProps {
  identifier: string;
  version?: string;
  title?: string;
  ariaLabel?: string;
  height?: string;
}

const DataWrapperEmbed: React.FC<DataWrapperEmbedProps> = ({
  identifier,
  version,
  title = "DataWrapper Visualization",
  ariaLabel = "Chart",
  height = "538"
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleResizeMessage(event: MessageEvent) {
      // Only process messages from our own iframe
      if (iframeRef.current?.contentWindow !== event.source) {
        return;
      }

      // Only process messages with height data
      if (!event.data["datawrapper-height"]) {
        return;
      }

      // Update the height of our specific iframe
      const chartId = Object.keys(event.data["datawrapper-height"])[0];
      if (chartId && iframeRef.current) {
        iframeRef.current.style.height = event.data["datawrapper-height"][chartId] + "px";
      }
    }

    window.addEventListener("message", handleResizeMessage);

    return () => {
      window.removeEventListener("message", handleResizeMessage);
    };
  }, []);

  const src = version 
    ? `https://datawrapper.dwcdn.net/${identifier}/${version}/`
    : `https://datawrapper.dwcdn.net/${identifier}/`;

  return (
    <div className="datawrapper-view">
      <iframe
        ref={iframeRef}
        title={title}
        aria-label={ariaLabel}
        id={`datawrapper-chart-${identifier}`}
        src={src}
        scrolling="no"
        frameBorder="0"
        style={{ width: "100%", border: "none" }}
        height={height}
        data-external="1"
      ></iframe>
    </div>
  );
};

export default DataWrapperEmbed;
