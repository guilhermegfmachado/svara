// Musical terms used across Svara. `scaleMatch` is optional: when present the
// glossary page runs it over the scale collection to show live examples, so
// the links can never drift out of sync with the data.


export const CORE = [
  // ── Fundamentals ──────────────────────────────────────────
  { term: 'Scale', cat: 'Fundamentals',
    def: 'An ordered set of pitches spanning an octave, used as the raw material for melody. Scales are usually described by the pattern of intervals between consecutive notes rather than by absolute pitch, which is why the same scale can start on any note.' },

  { term: 'Mode', cat: 'Fundamentals',
    def: 'A scale derived by treating a different note of a parent scale as the tonic. The seven modes of the major scale (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian) all contain identical notes but sound distinct because each centres on a different degree.',
    seeAlso: ['Tonic', 'Degree'],
    scaleMatch: s => /Mode$/.test(s.name) },

  { term: 'Tonic', cat: 'Fundamentals', also: 'Root, Sa, Tonal centre',
    def: 'The note a scale is built on and gravitates toward — the pitch that sounds like "home". Nearly every melodic tradition has a concept of it, though what creates the sense of centre differs: cadential motion in Western music, a sustained drone in Indian classical music.' },

  { term: 'Interval', cat: 'Fundamentals',
    def: 'The distance between two pitches, measured in semitones. Intervals are the building blocks of both scales (read horizontally, note to note) and chords (read vertically, stacked).' },

  { term: 'Semitone', cat: 'Fundamentals', also: 'Half step',
    def: 'The smallest interval in twelve-tone equal temperament — one fret on a guitar, one key on a piano including the black keys. Twelve semitones make an octave.' },

  { term: 'Whole tone', cat: 'Fundamentals', also: 'Whole step',
    def: 'An interval of two semitones — two frets, or two piano keys counting the black ones.' },

  { term: 'Octave', cat: 'Fundamentals',
    def: 'The interval between a pitch and another at exactly double its frequency. The two sound so alike that virtually every musical culture treats them as the same note, and scales are defined within a single octave then repeated.' },

  { term: 'Degree', cat: 'Fundamentals', also: 'Scale degree',
    def: 'The numbered position of a note within its scale, counting from the tonic as 1. A flat or sharp sign before the number (♭3, ♯4) shows the note is altered relative to the major scale.' },

  { term: 'Pitch class', cat: 'Fundamentals',
    def: 'All notes sharing a name regardless of octave — every C on the instrument is one pitch class. Scales are really sets of pitch classes, which is why a scale sounds the same played high or low.' },

  // ── Scale Structure ───────────────────────────────────────
  { term: 'Pentatonic', cat: 'Scale Structure',
    def: 'A scale of five notes per octave. Pentatonic scales appear independently in nearly every musical culture on earth, probably because the most common forms avoid semitones entirely and so contain no harshly dissonant intervals.',
    seeAlso: ['Anhemitonic'],
    scaleMatch: s => s.toneCount === 5 },

  { term: 'Hexatonic', cat: 'Scale Structure',
    def: 'A six-note scale. The whole-tone, augmented and blues scales are the best-known examples.',
    scaleMatch: s => s.toneCount === 6 },

  { term: 'Heptatonic', cat: 'Scale Structure',
    def: 'A seven-note scale. The major scale, the modes, most ragas and most maqamat are heptatonic, making it the most common scale size worldwide.',
    scaleMatch: s => s.toneCount === 7 },

  { term: 'Octatonic', cat: 'Scale Structure',
    def: 'An eight-note scale. The term usually means the symmetrical diminished scale, though bebop scales are also octatonic — a seven-note scale plus one chromatic passing tone.',
    scaleMatch: s => s.toneCount === 8 },

  { term: 'Anhemitonic', cat: 'Scale Structure',
    def: 'Containing no semitones — no two adjacent notes are a half step apart. Anhemitonic scales have no strongly dissonant intervals, so any two notes can be sounded together without clashing. Most pentatonic scales are anhemitonic.',
    scaleMatch: s => s.characteristics?.isAnhemitonic },

  { term: 'Tritone', cat: 'Scale Structure', also: 'Augmented fourth, Diminished fifth',
    def: 'An interval of exactly six semitones, splitting the octave in half. Medieval theorists called it diabolus in musica for its instability. In Western harmony its tension is what makes a dominant seventh chord demand resolution.',
    scaleMatch: s => s.characteristics?.hasTritone },

  { term: 'Augmented second', cat: 'Scale Structure',
    def: 'An interval of three semitones written as a second — the distinctive wide leap in harmonic minor, Hijaz and Bhairav. It is the single feature most responsible for what Western listeners perceive as an "Eastern" sound.',
    seeAlso: ['Hijaz'],
    scaleMatch: s => s.characteristics?.hasAugmentedInterval },

  { term: 'Tetrachord', cat: 'Scale Structure',
    def: 'A four-note fragment spanning a perfect fourth. Ancient Greek, Arabic and Turkish theory all build scales by joining two tetrachords, which is why maqam theory describes scales as combinations of smaller units rather than as single seven-note objects.',
    seeAlso: ['Jins', 'Maqam'] },

  { term: 'Symmetrical scale', cat: 'Scale Structure', also: 'Mode of limited transposition',
    def: 'A scale whose interval pattern repeats within the octave, so transposing it by a certain interval reproduces the same set of notes. Because of this it has fewer than twelve distinct transpositions. Messiaen catalogued these systematically; the whole-tone, diminished and augmented scales are the common ones.',
    scaleMatch: s => s.characteristics?.isSymmetric },

  { term: 'Chromatic', cat: 'Scale Structure',
    def: 'Using notes outside the prevailing scale. The chromatic scale itself is all twelve semitones; a "chromatic passing tone" is a note borrowed from outside the key to connect two scale tones smoothly.' },

  { term: 'Diatonic', cat: 'Scale Structure',
    def: 'Belonging to the seven-note major or minor scale in use. A diatonic scale has five whole tones and two semitones arranged so the semitones are maximally separated.' },

  // ── Western Harmony ───────────────────────────────────────
  { term: 'Dominant', cat: 'Western Harmony',
    def: 'The fifth degree of a scale, and the chord built on it. The dominant seventh chord contains a tritone whose resolution back to the tonic drives most Western harmonic motion.' },

  { term: 'Leading tone', cat: 'Western Harmony',
    def: 'The seventh degree when it sits a semitone below the tonic, creating a strong upward pull toward resolution. Raising the seventh of a natural minor scale to create one is precisely what produces the harmonic minor.' },

  { term: 'Cadence', cat: 'Western Harmony',
    def: 'A melodic or harmonic formula marking the end of a phrase — the musical equivalent of punctuation. Different traditions have characteristic cadential patterns that help identify a mode or raga as much as its notes do.' },

  { term: 'Triad', cat: 'Western Harmony',
    def: 'A three-note chord built by stacking two thirds: major, minor, diminished or augmented depending on the size of each third.' },

  { term: 'Voicing', cat: 'Western Harmony',
    def: 'The particular arrangement of a chord\'s notes — which are included, which are doubled, and in what order from lowest to highest. The same chord can be voiced dozens of ways, each with a different colour.',
    seeAlso: ['Inversion'] },

  { term: 'Inversion', cat: 'Western Harmony',
    def: 'A chord with something other than its root as the lowest note. A C major triad with E in the bass is in first inversion.' },

  { term: 'Transposition', cat: 'Western Harmony',
    def: 'Shifting an entire passage up or down by a fixed interval, preserving all the relationships between notes. On guitar this is often as simple as moving a shape along the neck.' },

  { term: 'Bebop scale', cat: 'Western Harmony',
    def: 'A seven-note scale with one chromatic passing tone added, making eight notes. Running it in steady eighth notes places every chord tone on a downbeat, which is the rhythmic trick underpinning bebop melodic lines.',
    scaleMatch: s => /Bebop/i.test(s.name) },

  { term: 'Altered scale', cat: 'Western Harmony', also: 'Super Locrian, Diminished whole-tone',
    def: 'The seventh mode of melodic minor, containing every possible alteration of a dominant chord (♭9, ♯9, ♯11, ♭13). The standard choice for improvising over an altered dominant in jazz.' },

  // ── Indian Classical ──────────────────────────────────────
  { term: 'Raga', cat: 'Indian Classical', also: 'Rāga, Raag',
    def: 'Far more than a scale: a melodic framework specifying not only which notes are used but how they may be approached, which are emphasised, which ornaments apply, and often what time of day or season the raga belongs to. Two ragas can share identical notes and remain entirely distinct.',
    seeAlso: ['Thaat', 'Gamaka', 'Vadi'],
    scaleMatch: s => /Raga|Hindustani|Carnatic/i.test(s.name + ' ' + s.tradition) },

  { term: 'Thaat', cat: 'Indian Classical',
    def: 'One of ten parent scales in the Hindustani system, used to classify ragas by their note content. Devised by V. N. Bhatkhande in the early twentieth century as an organising scheme; a thaat is a taxonomy, while a raga is a living melodic entity.' },

  { term: 'Melakarta', cat: 'Indian Classical', also: 'Mela',
    def: 'One of the 72 parent scales of the Carnatic system, generated systematically so that every possible combination of the twelve semitones producing a complete seven-note scale is accounted for. Each is numbered and named; derived ragas are called janya ragas.',
    scaleMatch: s => /melakarta/i.test(s.description || '') },

  { term: 'Gamaka', cat: 'Indian Classical',
    def: 'The ornamentation of Indian classical music — slides, oscillations, shakes and micro-inflections applied to individual notes. Gamaka is not decoration added to a melody but an inseparable part of it; a raga played without its gamakas is not recognisably that raga.' },

  { term: 'Komal', cat: 'Indian Classical',
    def: 'Flattened. A komal note is lowered by a semitone from its natural position — komal re is a flat second, komal ga a flat third. Sa and Pa (the first and fifth) are fixed and never komal.',
    seeAlso: ['Tivra', 'Sargam'] },

  { term: 'Tivra', cat: 'Indian Classical',
    def: 'Sharpened. Applies only to madhyam (the fourth degree): tivra ma is a raised fourth. The distinction between shuddha and tivra ma separates many otherwise similar ragas.',
    seeAlso: ['Komal'] },

  { term: 'Sargam', cat: 'Indian Classical',
    def: 'The Indian solfège syllables: Sa, Re, Ga, Ma, Pa, Dha, Ni. Equivalent in function to do-re-mi, and the source of the degree names used throughout Indian music theory.' },

  { term: 'Alap', cat: 'Indian Classical', also: 'Ālāp',
    def: 'The unmetred opening section of a raga performance, played without percussion. The performer introduces the raga gradually, note by note, establishing its character and permitted movements before any rhythmic cycle begins.' },

  { term: 'Vadi', cat: 'Indian Classical', also: 'Vadi and Samvadi',
    def: 'The most prominent note of a raga, around which phrases tend to settle. The samvadi is the second most important, usually a fourth or fifth away. Together they give a raga its centre of gravity.' },

  { term: 'Aroha and Avaroha', cat: 'Indian Classical',
    def: 'The ascending and descending forms of a raga. Many ragas use different notes going up than coming down, or approach the same notes by different routes, and this asymmetry is central to their identity.' },

  { term: 'Tanpura', cat: 'Indian Classical', also: 'Tambura',
    def: 'A long-necked lute with no frets, played continuously to sound a drone under a performance. The drone fixes the tonic absolutely, which is why Indian classical music can explore microtonal shading without ever losing its tonal centre.',
    seeAlso: ['Drone'] },

  { term: 'Shruti', cat: 'Indian Classical', also: 'Śruti',
    def: 'The smallest perceptible pitch interval in Indian theory, traditionally counted as 22 per octave. Shrutis describe the fine intonational shading of notes rather than a playable 22-note scale.',
    seeAlso: ['Microtonal'] },

  // ── Arabic & Turkish ──────────────────────────────────────
  { term: 'Maqam', cat: 'Arabic & Turkish', also: 'Maqām, plural Maqamat; Turkish Makam',
    def: 'The modal system of Arabic, Turkish and Persian music. Like a raga, a maqam is more than a scale: it specifies characteristic phrases, a typical melodic path, and points of rest. Maqamat are built by joining tetrachords called ajnas.',
    seeAlso: ['Jins', 'Tetrachord', 'Quarter tone'],
    scaleMatch: s => /Maqam|Makam/i.test(s.name) },

  { term: 'Jins', cat: 'Arabic & Turkish', also: 'Plural: Ajnas',
    def: 'A three-, four- or five-note fragment that serves as the building block of a maqam. Musicians think in ajnas rather than complete scales: modulating means moving from one jins to another, often pivoting on a shared note.',
    seeAlso: ['Maqam', 'Tetrachord'] },

  { term: 'Quarter tone', cat: 'Arabic & Turkish',
    def: 'An interval of roughly half a semitone. Several maqamat use notes that fall between the keys of a piano — the half-flat E of maqam Rast, for instance. In practice the tuning is flexible and regional rather than a fixed 24-note division.',
    seeAlso: ['Microtonal', 'Maqam'] },

  { term: 'Taqsim', cat: 'Arabic & Turkish', also: 'Taksim',
    def: 'An improvised, unmetred solo that explores a maqam — the Arabic counterpart of the Indian alap. It establishes the maqam\'s character and often modulates through several ajnas before returning home.' },

  { term: 'Hijaz', cat: 'Arabic & Turkish',
    def: 'A jins, and the maqam built on it, defined by an augmented second between its second and third notes. Probably the single most recognisable sound in Middle Eastern music.',
    seeAlso: ['Augmented second', 'Jins'],
    scaleMatch: s => /Hijaz/i.test(s.name) },

  // ── East & Southeast Asian ────────────────────────────────
  { term: 'Slendro', cat: 'East & Southeast Asian',
    def: 'A Javanese and Balinese gamelan tuning dividing the octave into five roughly equal steps. It corresponds to no Western scale, and no two gamelan orchestras are tuned quite alike — each set of instruments has its own character.',
    seeAlso: ['Pelog'],
    scaleMatch: s => /Slendro/i.test(s.name) },

  { term: 'Pelog', cat: 'East & Southeast Asian', also: 'Pélog',
    def: 'The seven-tone gamelan tuning system, with markedly uneven intervals. Most pieces use a five-note subset. Like slendro, its precise tuning varies from one gamelan to the next.',
    seeAlso: ['Slendro'],
    scaleMatch: s => /Pelog|Pélog/i.test(s.name) },

  { term: 'Honkyoku', cat: 'East & Southeast Asian',
    def: 'The solo shakuhachi repertoire of the Fuke Zen sect, played as a meditative practice rather than performance. Pieces are built around breath and timbre — the sound of the air itself is musical material.' },

  { term: 'Shakuhachi', cat: 'East & Southeast Asian',
    def: 'A Japanese end-blown bamboo flute with five finger holes. Pitch is shaded continuously by tilting the head and half-covering holes, so it moves between notes rather than stepping cleanly.' },

  { term: 'Koto', cat: 'East & Southeast Asian',
    def: 'A Japanese zither with thirteen silk or nylon strings over movable bridges. Because the bridges are repositioned to retune, koto scales such as hirajoshi are tunings as much as they are scales.',
    scaleMatch: s => /koto/i.test(s.description || '') },

  { term: 'Gong, Shang, Jue, Zhi, Yu', cat: 'East & Southeast Asian',
    def: 'The five degrees of the Chinese pentatonic system, each also naming the mode that begins on it. The system dates back over two millennia and underpins traditional Chinese melody.',
    scaleMatch: s => /chinese|gong|zhi/i.test(s.id) },

  // ── Guitar ────────────────────────────────────────────────
  { term: 'Open tuning', cat: 'Guitar',
    def: 'A tuning in which the open strings sound a chord. Barring straight across any fret then produces a full major or minor chord, which is what makes these tunings the natural home of slide guitar.',
    seeAlso: ['Slide guitar', 'Barre'] },

  { term: 'Drop tuning', cat: 'Guitar',
    def: 'A tuning with the lowest string lowered, most often from E to D. Power chords on the bottom three strings become a single-finger barre, and the extended low range suits heavy styles.' },

  { term: 'Cross-note tuning', cat: 'Guitar',
    def: 'An open tuning whose open chord is minor. A single finger raises the third to convert any chord to major, letting a player slide between minor and major freely — a hallmark of Delta blues.' },

  { term: 'Barre', cat: 'Guitar', also: 'Bar chord',
    def: 'Pressing one finger flat across several strings at the same fret. In open tunings a full barre transposes the open chord straight up the neck without changing its shape.' },

  { term: 'Capo', cat: 'Guitar',
    def: 'A clamp fixed across the fretboard that raises the pitch of all strings equally. It transposes the instrument while leaving open-string shapes and their ringing quality intact.' },

  { term: 'Slide guitar', cat: 'Guitar', also: 'Bottleneck',
    def: 'Playing with a glass or metal tube worn on a finger, pressed lightly against the strings instead of fretting them. Pitch becomes continuous rather than stepped, allowing the vocal glides central to blues.',
    seeAlso: ['Open tuning'] },

  { term: 'Power chord', cat: 'Guitar',
    def: 'Root and fifth with no third, so it is neither major nor minor. The absent third is why it stays clear under heavy distortion, where a full triad turns to mud.' },

  { term: 'Scale length', cat: 'Guitar',
    def: 'The vibrating length of the strings, from nut to bridge. Longer scale lengths hold tension better at low pitches, which is why baritone guitars exist and why very low tunings need heavy strings on a standard neck.' },

  { term: 'Fret', cat: 'Guitar',
    def: 'A metal strip across the fingerboard that stops the string at a fixed pitch. Each fret raises the pitch by one semitone, so the fretboard is a physical map of equal temperament.' },

  // ── Rhythm ────────────────────────────────────────────────
  { term: 'Tala', cat: 'Rhythm', also: 'Tāla, Taal',
    def: 'The rhythmic cycle of Indian classical music, defined by a fixed number of beats grouped into sections with a specific pattern of stresses. Teentaal, the most common, has sixteen beats in four groups of four.' },

  { term: 'Additive meter', cat: 'Rhythm', also: 'Aksak',
    def: 'A meter built by adding unequal groups — 9/8 as 2+2+2+3 rather than three even groups. Common throughout the Balkans, Turkey and the Middle East, where Turkish theory calls the limping feel aksak.' },

  { term: 'Compás', cat: 'Rhythm',
    def: 'The rhythmic cycle of flamenco, and more broadly the sense of being correctly inside it. The twelve-beat compás of soleá and bulería carries accents at irregular positions that take considerable practice to internalise.' },

  { term: 'Polyrhythm', cat: 'Rhythm',
    def: 'Two or more conflicting rhythms sounding at once, such as three evenly spaced beats against two. Fundamental to West and Central African drumming and to the traditions descended from it.' },

  { term: 'Clave', cat: 'Rhythm',
    def: 'A short asymmetric pattern that organises an entire ensemble in Afro-Cuban music. Every other part is positioned relative to it, and playing against it is heard immediately as wrong.' },

  // ── Tuning & Temperament ──────────────────────────────────
  { term: 'Equal temperament', cat: 'Tuning & Temperament', also: '12-TET',
    def: 'Dividing the octave into twelve mathematically identical semitones. Every interval except the octave is slightly out of tune against the natural harmonic series, but the compromise lets music be transposed to any key without retuning.',
    seeAlso: ['Just intonation', 'Cent'] },

  { term: 'Just intonation', cat: 'Tuning & Temperament',
    def: 'Tuning intervals as exact whole-number frequency ratios — 3:2 for a fifth, 5:4 for a major third. The result is purer than equal temperament but only in one key; modulating requires retuning.',
    seeAlso: ['Equal temperament'] },

  { term: 'Cent', cat: 'Tuning & Temperament',
    def: 'One hundredth of an equal-tempered semitone, so 1200 cents to the octave. The standard unit for describing tuning differences too small to notate, such as the roughly 50-cent quarter tones of Arabic music.' },

  { term: 'Microtonal', cat: 'Tuning & Temperament',
    def: 'Using intervals smaller than a semitone. Much of the world\'s music is microtonal in this sense — Arabic quarter tones, Indian shrutis, Javanese gamelan tunings — and fixed twelve-tone instruments can only approximate it.',
    seeAlso: ['Quarter tone', 'Shruti', 'Cent'] },

  { term: 'Drone', cat: 'Tuning & Temperament',
    def: 'A continuously sounding pitch, usually the tonic, held under a melody. Common to Indian classical music, bagpipe traditions, and open-tuned guitar, where ringing open strings supply it automatically.',
    seeAlso: ['Tanpura'] },

  { term: 'Temperament', cat: 'Tuning & Temperament',
    def: 'Any system that adjusts pure intervals slightly to make an instrument usable across many keys. Equal temperament is the modern standard; meantone and well temperaments preceded it and gave each key its own colour.' },
]
