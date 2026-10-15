import React from "react";
import { useEffect, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { ArrowDown, ArrowLeft, ArrowRight, Check, Copy, Gift, Heart, ImagePlus, Link2, MessageCircle, Music2, PartyPopper, Sparkles, WandSparkles } from 'lucide-react';
import { hasSupabase, supabase } from './supabase';

const templates = [
  { id: 'love', title: 'Made with love', category: 'Romantic', emoji: '💗', tone: 'rose', description: 'Soft, dreamy and full of love.' },
  { id: 'bestie', title: 'Bestie forever', category: 'Friends', emoji: '🎉', tone: 'violet', description: 'For the person who makes life fun.' },
  { id: 'family', title: 'Our favourite human', category: 'Family', emoji: '🌼', tone: 'sunshine', description: 'Warm wishes for someone special.' },
  { id: 'funny', title: 'Certified legend', category: 'Funny', emoji: '😎', tone: 'mint', description: 'A little chaos, a lot of birthday love.' },
];
const defaultMessage = 'You make ordinary days feel special. I hope this new year brings you all the happiness, love and little moments you deserve. Keep shining, always. ✨';
const localKey = 'bdayly-pages-v1';
const readLocal = () => { try { return JSON.parse(localStorage.getItem(localKey) || '{}'); } catch { return {}; } };
const makeSlug = (name) => `${name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 24) || 'birthday'}-${Math.random().toString(36).slice(2, 7)}`;

function Header() {
  return <header className="topbar"><Link to="/" className="brand"><span className="brand-icon"><Gift size={19} /></span><span>bdayly<span className="brand-dot">.</span></span></Link><a href="#how-it-works" className="nav-link">How it works</a><Link className="nav-cta" to="/create">Create for free <ArrowRight size={15} /></Link></header>;
}
function Home() {
  return <><Header /><main>
    <section className="premium-hero">
  <div className="premium-glow premium-glow-pink" />
  <div className="premium-glow premium-glow-purple" />

  <div className="premium-hero-inner">
    <div className="premium-copy">
      <div className="premium-badge">
        <Sparkles size={14} />
        <span>MAKE EVERY BIRTHDAY FEEL SPECIAL</span>
      </div>

      <h1>
        Not just a wish.
        <br />
        <span>A whole feeling.</span>
      </h1>

      <p className="premium-description">
        Turn your love into a beautiful little website.
        Personalise the surprise, add your heartfelt message,
        and send them a moment they will never forget.
      </p>

      <div className="premium-actions">
        <Link to="/create" className="premium-primary">
          Create your surprise
          <ArrowRight size={17} />
        </Link>

        <a href="#templates" className="premium-secondary">
          Explore experiences
          <ArrowDown size={16} />
        </a>
      </div>

      <div className="premium-trust">
        <div className="premium-trust-icon">
          <Heart size={17} />
        </div>
        <div>
          <strong>Made with love, just for them.</strong>
          <span>Free to create · No account required</span>
        </div>
      </div>
    </div>

    <div className="premium-visual">
      <div className="premium-orb premium-orb-one" />
      <div className="premium-orb premium-orb-two" />

      <div className="premium-floating premium-floating-top">
        <span className="premium-floating-icon">✦</span>
        A little surprise
      </div>

      <div className="premium-birthday-card">
        <div className="premium-card-top">
          <span>MADE WITH LOVE</span>
          <Heart size={17} fill="currentColor" />
        </div>

        <div className="premium-card-art">
          <div className="premium-card-ring" />
          <div className="premium-card-cake">🎂</div>
          <span className="premium-star star-one">✦</span>
          <span className="premium-star star-two">✧</span>
          <span className="premium-star star-three">✦</span>
        </div>

        <div className="premium-card-message">
          <span>A DAY AS SPECIAL AS YOU</span>
          <h2>Happy Birthday</h2>
          <h3>Someone Special</h3>
          <div className="premium-card-divider" />
          <p>
            You make the world a little brighter
            just by being in it.
          </p>
          <div className="premium-card-hearts">♡ &nbsp; ♥ &nbsp; ♡</div>
        </div>
      </div>

      <div className="premium-floating premium-floating-bottom">
        <span>💌</span>
        A message from the heart
      </div>

      <div className="premium-visual-caption">
        <span className="premium-live-dot" />
        A little link. A lasting memory.
      </div>
    </div>
  </div>

  <div className="premium-bottom-note">
    <span>THOUGHTFUL BY DESIGN</span>
    <span className="premium-note-line" />
    <span>UNFORGETTABLE BY HEART</span>
  </div>
</section>
    <section className="template-section wrap" id="templates"><div className="section-head"><div><div className="eyebrow">PICK YOUR VIBE</div><h2>A little something for <em>everyone.</em></h2></div><Link to="/create" className="inline-link">See all templates <ArrowRight size={16} /></Link></div><div className="template-grid">{templates.map((t, i) => <Link to={`/create?template=${t.id}`} key={t.id} className={`template-tile ${t.tone}`}><div className="tile-top"><span className="tile-category">{t.category}</span><span className="tile-emoji">{t.emoji}</span></div><div className="tile-preview"><span className="preview-spark">✦</span><span className="preview-heading">Happy Birthday</span><span className="preview-name">Your person</span><span className="preview-line" /></div><div className="tile-bottom"><div><h3>{t.title}</h3><p>{t.description}</p></div><span className="tile-arrow"><ArrowRight size={17} /></span></div></Link>)}</div></section>
    <section className="how-section" id="how-it-works"><div className="wrap"><div className="section-center"><div className="eyebrow">THREE LITTLE STEPS</div><h2>From your heart to <em>their screen.</em></h2><p>No design skills. No complicated setup. Just a thoughtful surprise.</p></div><div className="steps-grid"><div className="step"><span className="step-number">01</span><div className="step-icon"><WandSparkles /></div><h3>Choose your vibe</h3><p>Pick a look that feels like them — romantic, funny, warm or wonderful.</p></div><div className="step"><span className="step-number">02</span><div className="step-icon"><Heart /></div><h3>Make it personal</h3><p>Add their name and a message only you could write.</p></div><div className="step"><span className="step-number">03</span><div className="step-icon"><Link2 /></div><h3>Share the magic</h3><p>Get a unique link to send on WhatsApp, Instagram or anywhere.</p></div></div></div></section>
    <section className="final-cta wrap"><div><div className="eyebrow">THEIR DAY IS COMING</div><h2>Give them a moment<br />they'll <em>remember.</em></h2></div><Link to="/create" className="primary-btn">Make a free birthday page <ArrowRight size={17} /></Link><span className="cta-star star-a">✦</span><span className="cta-star star-b">✧</span></section>
  </main><footer className="footer wrap"><Link to="/" className="brand"><span className="brand-icon"><Gift size={16} /></span><span>bdayly<span className="brand-dot">.</span></span></Link><span>Made for the people who matter. © {new Date().getFullYear()} Bdayly</span></footer></>;
}
function Create() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [form, setForm] = useState({ recipient: '', sender: '', category: 'Friends', template: params.get('template') || 'bestie', message: defaultMessage, date: '', photo: '' });
  const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const selected = templates.find(t => t.id === form.template) || templates[1];
  const update = (key, value) => setForm(old => ({ ...old, [key]: value }));

  async function uploadPhoto(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG, WEBP, etc.).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Photo must be 5 MB or smaller.');
      return;
    }
    if (!hasSupabase || !supabase) {
      setError('Photo upload needs Supabase. You can still paste a public image URL below.');
      return;
    }

    setError('');
    setPhotoUploading(true);
    try {
      const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]/g, '-').replace(/-+/g, '-');
      const filePath = `birthday-photos/${Date.now()}-${Math.random().toString(36).slice(2, 9)}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from('birthday-photos').upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('birthday-photos').getPublicUrl(filePath);
      if (!data?.publicUrl) throw new Error('Photo uploaded, but its public URL could not be created.');
      update('photo', data.publicUrl);
    } catch (err) {
      setError(err.message || 'Photo upload failed. Check the Supabase Storage bucket and its policies.');
    } finally {
      setPhotoUploading(false);
    }
  }
  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true);
    const slug = makeSlug(form.recipient);
    const page = { ...form, slug, created_at: new Date().toISOString() };
    try {
      if (hasSupabase) {
        const { error: dbError } = await supabase.from('birthday_pages').insert({ slug, recipient_name: form.recipient.trim(), sender_name: form.sender.trim(), category: selected.category, template_id: form.template, message: form.message.trim(), birthday_date: form.date || null, photo_url: form.photo || null });
        if (dbError) throw dbError;
      } else {
        const pages = readLocal(); pages[slug] = page; localStorage.setItem(localKey, JSON.stringify(pages));
      }
      navigate(`/w/${slug}`);
    } catch (err) { setError(err.message || 'Could not create the page. Please try again.'); }
    finally { setBusy(false); }
  }
  return <><Header /><main className="create-wrap wrap"><Link to="/" className="back-link"><ArrowLeft size={16} /> Back home</Link><div className="create-heading"><div className="eyebrow">LET'S MAKE SOME MAGIC</div><h1>Make it <em>personal.</em></h1><p>A few little details, one lovely surprise.</p></div><div className="builder-layout"><form className="builder-form" onSubmit={submit}><div className="form-card"><div className="form-section-title"><span className="section-icon"><Heart size={17} /></span><div><h2>Who is it for?</h2><p>Let's start with your favourite human.</p></div></div><label>Birthday person's name<input required maxLength="50" value={form.recipient} onChange={e => update('recipient', e.target.value)} placeholder="e.g. Aanya" /></label><label>Your name <span className="optional">(optional)</span><input maxLength="50" value={form.sender} onChange={e => update('sender', e.target.value)} placeholder="e.g. Abhinav" /></label><label>Birthday date <span className="optional">(optional)</span><input type="date" value={form.date} onChange={e => update('date', e.target.value)} /></label></div>
    <div className="form-card"><div className="form-section-title"><span className="section-icon"><PartyPopper size={17} /></span><div><h2>Choose the feeling</h2><p>Pick the style that fits your person.</p></div></div><div className="choice-grid">{templates.map(t => <button type="button" key={t.id} onClick={() => { update('template', t.id); update('category', t.category) }} className={`choice-card ${form.template === t.id ? 'selected' : ''}`}><span className="choice-emoji">{t.emoji}</span><span><strong>{t.title}</strong><small>{t.category}</small></span>{form.template === t.id && <Check className="choice-check" size={16} />}</button>)}</div><label>Your birthday message<textarea required maxLength="600" rows="5" value={form.message} onChange={e => update('message', e.target.value)} placeholder="Write something from the heart..." /><span className="char-count">{form.message.length}/600</span></label><div className="photo-upload-field">
      <div className="photo-upload-heading"><span><ImagePlus size={17} /> Add a special photo <span className="optional">(optional)</span></span><small>JPG, PNG or WEBP · Max 5 MB</small></div>
      <label className="photo-upload-drop">
        <input type="file" accept="image/*" onChange={uploadPhoto} disabled={photoUploading || busy} />
        <span className="photo-upload-icon"><ImagePlus size={21} /></span>
        <strong>{photoUploading ? 'Uploading photo...' : form.photo ? 'Choose another photo' : 'Choose photo from your device'}</strong>
        <small>{photoUploading ? 'Please wait while your photo uploads to Supabase.' : 'Tap to browse your gallery or files'}</small>
      </label>
      {form.photo && <div className="photo-upload-status"><Check size={14} /> Photo added to your birthday page <button type="button" onClick={() => update('photo', '')}>Remove</button></div>}
      <label className="photo-url-fallback">Or paste a public image URL<input type="url" value={form.photo} onChange={e => update('photo', e.target.value)} placeholder="https://..." /></label>
    </div></div>
    {error && <div className="error-box">{error}{!hasSupabase && ' If this is a local demo, try again or check your browser storage.'}</div>}<button className="primary-btn submit-btn" disabled={busy || photoUploading}>{photoUploading ? 'Uploading photo...' : busy ? 'Creating your surprise…' : 'Create my birthday page'} <ArrowRight size={17} /></button><p className="privacy-note"><Sparkles size={13} /> Free to create. No account required.</p></form>
    <aside className={`live-preview ${selected.tone}`}><div className="preview-label"><span className="live-dot" /> LIVE PREVIEW</div><div className="preview-card"><div className="preview-decoration">✦　✧　✦</div><div className="preview-cake">{selected.emoji === '😎' ? '🎁' : '🎂'}</div><div className="preview-script">Happy Birthday</div><div className="preview-person">{form.recipient || 'Someone Special'}</div><div className="preview-divider" /><p>{form.message || 'Your lovely birthday message will appear here.'}</p>{form.photo && <img className="preview-photo" src={form.photo} alt="Birthday preview" onError={e => e.currentTarget.style.display = 'none'} />}<div className="preview-from">WITH LOVE{form.sender ? ` FROM ${form.sender.toUpperCase()}` : ''}</div><div className="preview-hearts">♡　♥　♡</div></div><div className="preview-foot"><Music2 size={14} /> A little page made just for them</div></aside></div></main><footer className="footer wrap"><Link to="/" className="brand"><span className="brand-icon"><Gift size={16} /></span><span>bdayly<span className="brand-dot">.</span></span></Link><span>Made for the people who matter.</span></footer></>;
}
function WishPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (hasSupabase) {
          const { data, error: dbError } = await supabase
            .from('birthday_pages')
            .select('*')
            .eq('slug', slug)
            .single();

          if (dbError) throw dbError;
          if (alive) {
            setPage({
              slug,
              recipient: data.recipient_name,
              sender: data.sender_name,
              template: data.template_id,
              message: data.message,
              date: data.birthday_date,
              photo: data.photo_url
            });
          }
        } else {
          const found = readLocal()[slug];
          if (alive && found) setPage(found);
          else if (alive) {
            setError('This demo link is saved only in the browser where it was created. Connect Supabase to make links work for everyone.');
          }
        }
      } catch {
        if (alive) setError('We could not find this birthday page. It may have been removed or the link may be incorrect.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => { alive = false; };
  }, [slug]);

  const theme = templates.find(t => t.id === page?.template) || templates[1];

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappMessage = `A little birthday surprise for you 🎂✨\nOpen it here: ${shareUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Copy failed. Please copy the link from your browser address bar.');
    }
  }

  function openSurprise() {
    setRevealed(true);
  }

  if (loading) {
    return (
      <div className="wish-state wish-loading">
        <div className="loader" />
        <p>Unwrapping your surprise…</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="wish-state">
        <div className="empty-icon">🎈</div>
        <h1>Oops, surprise not found.</h1>
        <p>{error}</p>
        <Link className="primary-btn" to="/create">Create a birthday page <ArrowRight size={16} /></Link>
      </div>
    );
  }

  return (
    <main className={`wish-page wish-premium ${theme.tone}`}>
      <div className="wish-ambient wish-ambient-one" />
      <div className="wish-ambient wish-ambient-two" />

      <header className="wish-top wish-premium-top">
        <Link to="/" className="brand">
          <span className="brand-icon"><Gift size={18} /></span>
          <span>bdayly<span className="brand-dot">.</span></span>
        </Link>
        <div className="wish-share-actions">
          <button type="button" className="share-btn wish-share-btn" onClick={copyLink}>
            <Copy size={15} />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
          <a className="share-btn wish-share-btn wish-whatsapp-btn" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Share birthday page on WhatsApp">
            <MessageCircle size={15} />
            WhatsApp
          </a>
        </div>
      </header>

      <section className={`wish-stage wish-premium-stage ${revealed ? 'is-revealed' : ''}`}>
        <div className="wish-intro">
          <span className="wish-intro-kicker"><Sparkles size={13} /> A LITTLE SOMETHING, MADE JUST FOR YOU</span>
          <h2>A moment of <em>birthday magic.</em></h2>
          <p>Someone has a little surprise waiting for you.</p>
        </div>

        {revealed && (
          <div className="wish-confetti-burst" aria-hidden="true">
            {Array.from({ length: 42 }, (_, i) => (
              <span
                key={i}
                className={`confetti-piece confetti-piece-${i % 6}`}
                style={{
                  left: `${(i * 37 + 7) % 100}%`,
                  animationDelay: `${(i % 14) * 0.035}s`,
                  '--confetti-drift': `${((i * 19) % 180) - 90}px`,
                  '--confetti-rotate': `${(i * 53) % 540}deg`
                }}
              />
            ))}
          </div>
        )}

        <div className={`wish-premium-card ${revealed ? 'wish-premium-card-open' : ''}`}>
          <div className="wish-card-glow" />
          <div className="wish-card-topline">
            <span className="wish-card-brand"><Gift size={14} /> BDAYLY SPECIAL DELIVERY</span>
            <span className="wish-card-heart"><Heart size={17} fill="currentColor" /></span>
          </div>

          {!revealed ? (
            <div className="wish-locked-content">
              <div className="wish-gift-scene">
                <span className="wish-gift-orbit wish-gift-orbit-a" />
                <span className="wish-gift-orbit wish-gift-orbit-b" />
                <div className="wish-gift-box" aria-hidden="true">
                  <span className="wish-gift-lid" />
                  <span className="wish-gift-ribbon-v" />
                  <span className="wish-gift-ribbon-h" />
                  <span className="wish-gift-bow">♡</span>
                </div>
                <span className="wish-gift-spark wish-spark-a">✦</span>
                <span className="wish-gift-spark wish-spark-b">✧</span>
                <span className="wish-gift-spark wish-spark-c">✦</span>
              </div>
              <span className="wish-card-eyebrow">A SURPRISE FOR</span>
              <h1>{page.recipient}</h1>
              <p className="wish-card-subtitle">Your special moment is ready to be unwrapped.</p>
              <button className="wish-open-button" onClick={openSurprise}>
                <span>Open your surprise</span>
                <span className="wish-open-button-icon"><Gift size={17} /></span>
              </button>
              <span className="wish-card-footnote"><Heart size={12} /> Made with love, just for you</span>
            </div>
          ) : (
            <div className="wish-reveal-content" key="revealed">
              <div className="wish-reveal-sparkles" aria-hidden="true">✧　✦　✧</div>
              <div className="wish-reveal-badge"><PartyPopper size={14} /> IT'S YOUR DAY!</div>
              <div className="wish-reveal-cake" aria-hidden="true">🎂</div>
              <span className="wish-card-eyebrow">HAPPY BIRTHDAY</span>
              <h1 className="wish-reveal-title">{page.recipient}</h1>
              <div className="wish-reveal-divider"><span>♥</span></div>
              {page.photo && (
                <img
                  className="wish-reveal-photo"
                  src={page.photo}
                  alt={`A special memory for ${page.recipient}`}
                  onError={e => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <p className="wish-reveal-message">{page.message}</p>
              {page.sender && (
                <div className="wish-premium-signoff">
                  <span>WITH LOVE,</span>
                  <strong>{page.sender}</strong>
                  <span className="wish-signoff-heart">♥</span>
                </div>
              )}
              <div className="wish-reveal-bottom-hearts" aria-hidden="true">♡　♥　♡</div>
              <button className="wish-replay-button" onClick={() => setRevealed(false)}>
                <span>Close surprise</span>
              </button>
            </div>
          )}
        </div>

        <div className="wish-premium-caption">
          <span className="wish-caption-dot" />
          A little page. A lot of love.
        </div>
      </section>

      <footer className="wish-premium-footer">
        <span>MADE FOR THE PEOPLE WHO MATTER</span>
        <span className="wish-footer-divider" />
        <Link to="/">bdayly<span className="brand-dot">.</span></Link>
      </footer>
      {error && <div className="wish-copy-error" role="status">{error}</div>}
    </main>
  );
}
function NotFound() { return <div className="wish-state"><h1>That page wandered off.</h1><Link to="/" className="primary-btn">Back to Bdayly <ArrowRight size={16} /></Link></div> }
export default function App() { return <Routes><Route path="/" element={<Home />} /><Route path="/create" element={<Create />} /><Route path="/w/:slug" element={<WishPage />} /><Route path="*" element={<NotFound />} /></Routes> }
