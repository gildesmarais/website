export const layout = 'page.vto'

export const playAudio = (event: MouseEvent) => {
  const audio = document.querySelector<HTMLAudioElement>('#index-ipa > audio');
  if (!audio) return;

  audio.play();
}

const ipaPlayStyles = {
  maxWidth: '1rem',
  maxHeight: 'var(--line-height)',
  cursor: 'pointer'
}
export default (data: Lume.Data, helpers: Lume.Helpers) => (
    <div className="h-card index" id="hcard-Gil-Desmarais">
      <h1 className="index__headline">Hi, I'm <span className="p-name">Gil Desmarais</span>!</h1>

      <figure id="index-ipa" className="index__ipa">
        <figcaption onClick={playAudio}>
          <span className="p-ipa">/ʒ​ɪ​l dɛsm​​ɐ​ʁɛ/</span>
          <img
            style={ipaPlayStyles}
            src="/assets/speaker.svg"
            alt="A speaker icon symbolizing a link to a spoken version of this website's author name"
            role="button" />
        </figcaption>
        <audio preload="metadata" src="/index.flac"></audio>
      </figure>

      <a href={data.site.options.location} className="u-url" hidden>{data.site.options.location.toString()}</a>

      <p>Welcome to my website!</p>

      <p>
        I live in <span className="p-locality">Berlin</span> currently and work as <span className="p-job-title">full stack developer</span>.
      </p>
      <p>
        Full stack means I develop on the <span className="p-category">frontend</span>
        and <span className="p-category">backend</span>
        of web applications, which I also monitor and analyze. Read <a href="/resume">my résumé</a>
        and check out <a href="/projects">my projects</a>!
      </p>

      <p>
        Occasionally, I post on
        <a href="/blog" className="p-category">my blog</a>
        about

        <a href="/tag/programming/" className="tag p-category">programming</a>,
        <a href="/tag/macos/" className="tag p-category">macOS</a>,
        <a href="/tag/food/" className="tag p-category">food</a>.
        <br />
        I like to <a href="/ratings/">rate and review</a> movies.
      </p>

      <p>
        I'm furthermore interested in
        <span className="p-category">music</span>, <span className="p-category">sports</span>,
        <span className="p-category">bicycling</span>
        and
        <span className="p-category">general aviation</span>.
      </p>
    </div>
);
