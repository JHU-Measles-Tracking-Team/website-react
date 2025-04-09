import React from "react";

interface DataWrapperScriptEmbedProps {
  identifier: string;
  title?: string;
  height?: string;
}

const DataWrapperScriptEmbed: React.FC<DataWrapperScriptEmbedProps> = ({
  identifier,
  title,
  height = "442px",
}) => {
  return (
    <div
      style={{ minHeight: height }}
      dangerouslySetInnerHTML={{
        __html: `<script type="text/javascript" defer src="https://datawrapper.dwcdn.net/${identifier}/embed.js" charset="utf-8"></script>`,
      }}
    >
      {/* <noscript> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* <img
          src={`https://datawrapper.dwcdn.net/${identifier}/full.png`}
          alt={title || ""}
        />
      </noscript> */}
    </div>
  );
};

export default DataWrapperScriptEmbed;
