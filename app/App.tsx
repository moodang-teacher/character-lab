import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Clapperboard, Copy, Palette, Sparkles } from 'lucide-react';

type Plan = { animal: string; traits: string[]; color: string; prop: string; twist: string; character: string; action: string; line: string; style: string };
const initial: Plan = { animal: '', traits: [], color: '', prop: '', twist: '', character: '', action: '손을 작게 흔든다', line: '', style: '말랑한 3D 캐릭터' };
const animals = [['🐱', '고양이'], ['🦦', '수달'], ['🐰', '토끼'], ['🐻', '곰'], ['🦊', '여우'], ['🐧', '펭귄'], ['🦖', '공룡'], ['🥔', '감자'], ['☁️', '구름'], ['🤖', '로봇']];
const traits = ['낯을 가리는', '장난기 많은', '느긋한', '호기심 많은', '다정한', '엉뚱한', '열정적인', '꼼꼼한'];
const colors = [['하늘색', '#99d8ee'], ['보라색', '#bba7eb'], ['연두색', '#c9e79c'], ['분홍색', '#f4b9cd'], ['노란색', '#f6dc7d'], ['검정', '#383c39']];
const props = ['🎧 헤드폰', '🎮 게임기', '📒 스케치북', '🍪 간식', '🎒 가방', '📷 카메라'];
const twists = ['무뚝뚝해 보이지만 친구를 잘 챙김', '평소엔 조용하지만 좋아하는 얘기엔 신남', '느려 보여도 끝까지 포기하지 않음', '작고 귀엽지만 누구보다 용감함', '엉뚱하지만 결정적일 때 진지함'];
const actions = ['손을 작게 흔든다', '고개를 갸웃거린다', '기지개를 켠다', '작게 점프하며 인사한다'];
const styles = ['말랑한 3D 캐릭터', '평면 스티커 일러스트', '픽셀 아트', '따뜻한 색연필 일러스트'];

function imageText(p: Plan) { return `${p.style} 스타일의 오리지널 ${p.animal} 캐릭터 한 명. 성격은 ${p.traits.join(', ')}. 대표 색상은 ${p.color}. ${p.prop} 소품을 지니고 있다. 반전 매력: ${p.twist}. 성격이 표정과 자세에 드러나게 표현한다. 단순한 밝은 배경, 얼굴과 손이 잘 보이는 정면 전신 구도, 부드러운 조명. 글자나 로고 없이 캐릭터 한 명만 표현한다.`; }
function videoText(p: Plan) { return `첨부한 캐릭터 이미지의 외형, 색상, 소품을 유지한다. 고정된 카메라와 단순한 배경. 캐릭터가 ${p.action}. 자연스럽고 간결한 움직임. 캐릭터가 한국어로 "${p.line || '안녕! 만나서 반가워.'}"라고 말한다. 동작 하나와 짧은 대사 한 문장으로 구성된 짧은 자기소개 장면. 화면에 자막이나 글자를 추가하지 않는다.`; }

export default function App() {
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Plan>(initial);
  const [actionChoice, setActionChoice] = useState(initial.action);
  const [customAction, setCustomAction] = useState('');
  const [animalChoice, setAnimalChoice] = useState('');
  const [customAnimal, setCustomAnimal] = useState('');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([]);
  const [customTraitEnabled, setCustomTraitEnabled] = useState(false);
  const [customTrait, setCustomTrait] = useState('');
  const [colorChoice, setColorChoice] = useState('');
  const [customColor, setCustomColor] = useState('#7c5ce0');
  const [propChoice, setPropChoice] = useState('');
  const [customProp, setCustomProp] = useState('');
  const [twistChoice, setTwistChoice] = useState('');
  const [customTwist, setCustomTwist] = useState('');
  const [ip, setIp] = useState('');
  const [vp, setVp] = useState('');
  const [copied, setCopied] = useState('');
  const [error, setError] = useState('');
  function update<K extends keyof Plan>(key: K, value: Plan[K]) { setP(current => ({ ...current, [key]: value })); }
  function changeAction(value: string) { const action = value.trim(); setP(current => ({ ...current, action })); if (vp) setVp(action ? videoText({ ...p, action }) : ''); }
  async function copy(text: string, key: string) { try { await navigator.clipboard.writeText(text); setCopied(key); window.setTimeout(() => setCopied(''), 1800); } catch { setError('복사가 차단되었습니다. 텍스트를 직접 선택해 복사해 주세요.'); } }
  const currentTraits = [...selectedTraits, ...(customTraitEnabled && customTrait.trim() ? [customTrait.trim()] : [])];
  const currentPlan = { ...p, traits: currentTraits };
  const traitCount = selectedTraits.length + Number(customTraitEnabled);
  const appearanceValid = !!p.animal.trim() && currentTraits.length > 0 && (!customTraitEnabled || !!customTrait.trim());
  const detailsValid = !!p.color && !!p.prop.trim() && !!p.twist.trim();
  const valid = step === 1 ? appearanceValid : step === 2 ? detailsValid
    : appearanceValid && detailsValid && !!p.character.trim() && !!p.action.trim();
  const mascot = animals.find(([, animal]) => animal === p.animal)?.[0] || (animalChoice === 'custom' ? '✳' : '🦦');
  const previewColor = colorChoice === 'custom' ? customColor : colors.find(([color]) => color === p.color)?.[1] || '#dce7c9';
  return <>
    <header><a className="brand" href="./">✳ <span>캐릭터 연구소<small>CHARACTER LAB</small></span></a><span className="lesson">AI 원데이클래스</span></header>
    <main>{step === 0 ? <div className="hero"><section>
      <div className="eyebrow"><span className="dot" /> MY FIRST AI CHARACTER</div>
      <h1>나의 취향이<br />하나의 <em>캐릭터</em>로.</h1>
      <p className="lead">그림을 잘 그리지 않아도 괜찮아.<br />몇 가지 선택으로, 나를 닮은 캐릭터를 기획해 봐.</p>
      <div className="tags"><span>✦ 특징 고르기</span><span>✦ 프롬프트 만들기</span><span>✦ 직접 복사하기</span></div>
      <button className="primary heroCta" onClick={() => setStep(1)}>내 캐릭터 기획하기 <ArrowRight size={19} /></button>
    </section><section className="heroArt" aria-label="캐릭터 기획 예시"><div className="orbit o1" /><div className="orbit o2" /><div className="floatTag topTag">성격 <b>조용하지만 호기심 가득</b></div><div className="mascot">🦦<span>🎧</span></div><div className="spark s1">✳</div><div className="spark s2">✦</div><div className="floatTag bottomTag">반전 매력 <b>게임 얘기엔 누구보다 신남!</b></div><div className="artCaption"><span>MEET YOUR ALTER EGO</span><b>상상 속의 나를 만나 봐.</b></div></section></div> : <>
      <div className="workHeading"><div><div className="eyebrow">MY CHARACTER PLAN</div><h1>{step === 1 ? '어떤 친구를 만들어 볼까?' : step === 2 ? '취향을 한 스푼 더해 봐.' : '이제, 세상에 소개할 차례.'}</h1><p className="lead">나와 닮아도, 내가 되고 싶은 모습이어도 좋아.</p></div><span className="stepNum">0{step} <small>/ 03</small></span></div>
      <div className="progress">{['모습과 성격', '색상과 매력', '이름과 프롬프트'].map((label, i) => <span className={step >= i + 1 ? 'active' : ''} key={label}><b>{i + 1}</b>{label}</span>)}</div>
      <div className="workGrid"><section className="panel formPanel">
        {step === 1 ? <>
          <h2>01. 어떤 모습이면 좋겠어?</h2>
          <p className="hint">캐릭터의 바탕이 될 사람, 동물이나 사물을 골라 줘.</p>
          <div className="animalGrid">
            {[...animals, ['🧑', '사람']].map(([emoji, animal]) => <button aria-pressed={animalChoice === animal} className={'choice animal ' + (animalChoice === animal ? 'selected' : '')} key={animal} onClick={() => { setAnimalChoice(animal); update('animal', animal); }}><span>{emoji}</span>{animal}{animalChoice === animal && <Check size={15} />}</button>)}
            <button aria-pressed={animalChoice === 'custom'} className={'choice animal ' + (animalChoice === 'custom' ? 'selected' : '')} onClick={() => { setAnimalChoice('custom'); update('animal', customAnimal.trim()); }}><span>✏️</span>직접 작성</button>
          </div>
          {animalChoice === 'custom' && <label className="customField">원하는 모습 *<input autoFocus value={customAnimal} maxLength={60} placeholder="예: 마법사, 용, 작은 별" onChange={e => { setCustomAnimal(e.target.value); update('animal', e.target.value.trim()); }} /></label>}
          <h2>02. 나를 표현하는 성격은?</h2>
          <p className="hint">한 개 또는 두 개를 골라 줘. <b>{traitCount}/2</b></p>
          <div className="chips">
            {traits.map(trait => <button aria-pressed={selectedTraits.includes(trait)} className={'choice ' + (selectedTraits.includes(trait) ? 'selected' : '')} key={trait} onClick={() => setSelectedTraits(current => current.includes(trait) ? current.filter(value => value !== trait) : current.length + Number(customTraitEnabled) < 2 ? [...current, trait] : current)}>{trait}</button>)}
            <button aria-pressed={customTraitEnabled} disabled={!customTraitEnabled && selectedTraits.length >= 2} className={'choice ' + (customTraitEnabled ? 'selected' : '')} onClick={() => setCustomTraitEnabled(value => !value)}>✏️ 직접 작성</button>
          </div>
          {customTraitEnabled && <label className="customField">나만의 성격 *<input autoFocus value={customTrait} maxLength={60} placeholder="예: 새로운 것을 발견하면 신나는" onChange={e => setCustomTrait(e.target.value)} /></label>}
        </> : step === 2 ? <>
          <h2>03. 대표 색상은?</h2>
          <div className="colors">
            {colors.map(([color, hex]) => <button aria-pressed={colorChoice === color} className={'choice ' + (colorChoice === color ? 'selected' : '')} key={color} onClick={() => { setColorChoice(color); update('color', color); }}><i style={{ background: hex }} />{color}</button>)}
            <button aria-pressed={colorChoice === 'custom'} className={'choice ' + (colorChoice === 'custom' ? 'selected' : '')} onClick={() => { setColorChoice('custom'); update('color', customColor); }}><i style={{ background: customColor }} />직접 선택</button>
          </div>
          {colorChoice === 'custom' && <label className="customField colorField">원하는 색상<input type="color" value={customColor} onChange={e => { setCustomColor(e.target.value); update('color', e.target.value); }} /><span>{customColor.toUpperCase()}</span></label>}
          <h2>04. 꼭 가지고 다니는 소품은?</h2>
          <div className="chips">{props.map(prop => <button aria-pressed={propChoice === prop} className={'choice ' + (propChoice === prop ? 'selected' : '')} key={prop} onClick={() => { setPropChoice(prop); update('prop', prop); }}>{prop}</button>)}<button aria-pressed={propChoice === 'custom'} className={'choice ' + (propChoice === 'custom' ? 'selected' : '')} onClick={() => { setPropChoice('custom'); update('prop', customProp.trim()); }}>✏️ 직접 작성</button></div>
          {propChoice === 'custom' && <label className="customField">나만의 소품 *<input autoFocus value={customProp} maxLength={60} placeholder="예: 작은 망원경" onChange={e => { setCustomProp(e.target.value); update('prop', e.target.value.trim()); }} /></label>}
          <h2>05. 알고 보면 이런 매력이!</h2>
          <div className="twists">{twists.map(twist => <button aria-pressed={twistChoice === twist} className={'choice ' + (twistChoice === twist ? 'selected' : '')} key={twist} onClick={() => { setTwistChoice(twist); update('twist', twist); }}>{twist}</button>)}<button aria-pressed={twistChoice === 'custom'} className={'choice ' + (twistChoice === 'custom' ? 'selected' : '')} onClick={() => { setTwistChoice('custom'); update('twist', customTwist.trim()); }}>✏️ 직접 작성</button></div>
          {twistChoice === 'custom' && <label className="customField">나만의 반전 매력 *<input autoFocus value={customTwist} maxLength={120} placeholder="예: 겁이 많지만 친구를 위해 용기를 낸다" onChange={e => { setCustomTwist(e.target.value); update('twist', e.target.value.trim()); }} /></label>}
        </> : <>
          <h2>06. 이름과 자기소개 정하기</h2><div className="entryFields"><label>캐릭터 이름 *<input value={p.character} maxLength={20} placeholder="예: 수줍수달" onChange={e => update('character', e.target.value)} /></label><label>이미지 스타일<select value={p.style} onChange={e => update('style', e.target.value)}>{styles.map(style => <option key={style}>{style}</option>)}</select></label></div>
          <label>동작 하나<select value={actionChoice} onChange={e => { const value = e.target.value; setActionChoice(value); changeAction(value === 'custom' ? customAction : value); }}>{actions.map(action => <option key={action}>{action}</option>)}<option value="custom">직접 작성하기</option></select></label>
          {actionChoice === 'custom' && <><label>나만의 동작 *<input value={customAction} maxLength={120} placeholder="예: 스케치북을 펼쳐 그림을 보여 준다" onChange={e => { setCustomAction(e.target.value); changeAction(e.target.value); }} /></label><p className="hint">캐릭터가 할 동작 하나를 짧게 적어 줘.</p></>}
          <label>짧은 대사 한 문장<input maxLength={60} value={p.line} placeholder="예: 안녕! 게임 얘기라면 나도 끼워 줘." onChange={e => update('line', e.target.value)} /></label>
          <button className="secondary" disabled={!valid} onClick={() => { setIp(imageText(currentPlan)); setVp(videoText(currentPlan)); }}><Sparkles size={16} /> 선택한 특징으로 프롬프트 만들기</button><p className="hint">생성된 문장에서 마음에 안 드는 부분을 직접 고쳐 보세요.</p>
          {ip && <><div className="sectionHead"><h2><Palette size={17} /> 이미지 프롬프트</h2><button className="textButton" onClick={() => copy(ip, 'image')}><Copy size={15} />{copied === 'image' ? '복사 완료' : '복사'}</button></div><textarea aria-label="이미지 프롬프트" value={ip} onChange={e => setIp(e.target.value)} rows={6} /><div className="sectionHead"><h2><Clapperboard size={17} /> 영상 프롬프트</h2><button className="textButton" onClick={() => copy(vp, 'video')}><Copy size={15} />{copied === 'video' ? '복사 완료' : '복사'}</button></div><textarea aria-label="영상 프롬프트" value={vp} onChange={e => setVp(e.target.value)} rows={5} /><p className="hint">이미지 프롬프트는 이미지 생성 도구에 붙여 넣으세요. 영상 프롬프트는 완성한 이미지와 함께 사용할 수 있어요.</p></>}
        </>}
        <div className="navigation"><button className="secondary" onClick={() => { setError(''); setStep(value => value - 1); }}><ArrowLeft size={17} /> 이전</button>{step < 3 && <button disabled={!valid} className="primary" onClick={() => setStep(value => value + 1)}>다음 단계 <ArrowRight size={18} /></button>}</div>
      </section><aside><div className="characterCard"><div className="cardTop">MY CHARACTER NOTE <span>✦</span></div><div className="previewEmoji" style={{ background: previewColor }}>{mascot}</div><small>캐릭터 기획 미리보기</small><h2>{p.character || '아직 이름 없는 친구'}</h2><p>{currentTraits.length ? currentTraits.join(' · ') : '어떤 성격을 갖게 될까?'}</p><div className="cardLine" /><dl><dt>모습</dt><dd>{p.animal || '선택 전'}</dd><dt>색상</dt><dd>{p.color || '선택 전'}</dd><dt>소품</dt><dd>{p.prop || '선택 전'}</dd></dl><div className="twistPreview">✦ 반전 매력<p>{p.twist || '나만의 매력을 더해 줘.'}</p></div></div><p className="asideNote">입력 내용은 저장되지 않아요. 필요한 프롬프트는 페이지를 떠나기 전에 복사해 주세요.</p></aside></div>
    </>}{error && <div className="error" role="alert">{error}</div>}<footer><span>✳ CHARACTER LAB</span><span>생각하는 건 나, 표현을 돕는 건 AI.</span></footer></main>
  </>;
}
