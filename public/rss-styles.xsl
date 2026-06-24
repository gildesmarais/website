<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title><xsl:value-of select="rss/channel/title"/> Feed</title>
        <style>
          body {
            background-color: hsl(0, 0%, 4%);
            color: #e6e6e6;
            font-family: "IBM Plex Sans", system-ui, sans-serif;
            line-height: 1.5;
            max-width: 60ch;
            margin: 0 auto;
            padding: clamp(1.5rem, 3vw, 3rem) 1rem;
          }
          .info {
            background: #111;
            border: 1px solid #1f1f1f;
            padding: 1rem;
            margin-bottom: 2.5rem;
            font-size: 0.9rem;
          }
          .info strong {
            color: #fff;
          }
          .info a {
            color: hsl(32, 100%, 50%);
          }
          h1 {
            color: #fff;
            border-left: 4px solid hsl(32, 100%, 50%);
            padding-left: 0.7rem;
            font-size: 2rem;
            margin: 0 0 0.5rem 0;
            letter-spacing: -0.01em;
          }
          .description {
            color: #a3a3a3;
            margin: 0 0 3rem 0;
            font-size: 1.05rem;
          }
          .entry {
            margin-bottom: 3rem;
            border-left: 4px solid hsl(32, 100%, 50%);
            padding-left: 1rem;
          }
          .entry h2 {
            margin: 0 0 0.25rem 0;
            font-size: 1.4rem;
            line-height: 1.2;
            letter-spacing: -0.01em;
          }
          .entry a {
            color: #e6e6e6;
            text-decoration: underline;
            text-decoration-thickness: 3px;
            text-underline-offset: 0.15em;
            transition: background 0.15s ease, color 0.15s ease;
          }
          .entry a:hover {
            background: hsl(32, 100%, 50%);
            color: #000;
            text-decoration: none;
          }
          .entry .date {
            font-family: "Ubuntu Mono", monospace;
            font-size: 0.85rem;
            color: #a3a3a3;
            margin-bottom: 0.75rem;
          }
          .entry p {
            margin: 0;
            color: #a3a3a3;
          }
        </style>
      </head>
      <body>
        <div class="info">
          This is the RSS feed for <strong><xsl:value-of select="rss/channel/title"/></strong>. 
          Copy this URL into your news reader app to subscribe.
        </div>
        <h1><xsl:value-of select="rss/channel/title"/></h1>
        <p class="description"><xsl:value-of select="rss/channel/description"/></p>
        <div class="entries">
          <xsl:for-each select="rss/channel/item">
            <div class="entry">
              <h2>
                <a href="{link}"><xsl:value-of select="title"/></a>
              </h2>
              <div class="date"><xsl:value-of select="pubDate"/></div>
              <p><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
