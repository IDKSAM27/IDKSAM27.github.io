'use client';

import { useEffect, useId, useState } from 'react';
import { useTheme } from 'next-themes';

export default function MermaidDiagram({ chart, title, description }: { chart: string; title: string; description: string }) {
  const uid = useId().replace(/:/g, '');
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState('');
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setSvg(''); setFailed(false);
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: resolvedTheme === 'dark' ? 'dark' : 'neutral', flowchart: { htmlLabels: false, useMaxWidth: false } });
      const output = await mermaid.render(`diagram-${uid}`, chart);
      if (live) setSvg(output.svg.replace('<svg ', `<svg role="img" aria-labelledby="diagram-${uid}-title diagram-${uid}-desc" `).replace('<style>', `<title id="diagram-${uid}-title">${title}</title><desc id="diagram-${uid}-desc">${description}</desc><style>`));
    }).catch(() => live && setFailed(true));
    return () => { live = false; };
  }, [chart, description, resolvedTheme, title, uid]);
  return (
    <figure className="eng-diagram">
      <div className="eng-diagram-canvas" aria-busy={!svg && !failed}>{svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>{failed ? 'The diagram could not be rendered. Its source remains available below.' : 'Rendering architecture diagram…'}</p>}</div>
      <figcaption>{title}. <span>{description}</span></figcaption>
      <details><summary>View diagram source</summary><pre><code>{chart}</code></pre></details>
    </figure>
  );
}
