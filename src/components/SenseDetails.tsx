"use client";
import {FORM_KEYS} from "../domain/contracts";
import type {SenseRecord} from "../domain/contracts";
import {useGuestLearning} from "./LearningProvider";
export function SenseDetails({sense}:{sense:SenseRecord}) {
 const guest=useGuestLearning();
 const flags=guest.snapshot.flags[sense.id]??{favorite:false,studied:false};
 return <article className="panel sense-details" data-testid="sense-details" aria-label="Selected sense">
  <p className="eyebrow">{sense.level} · SELECTED MEANING</p><h2 lang="sv">{sense.v}</h2><p className="meaning">{sense.meaning}</p>
  <div className="actions"><button type="button" aria-disabled={guest.pending} aria-pressed={flags.favorite} onClick={()=>{if(!guest.pending)void guest.flags(sense.id,{favorite:!flags.favorite});}}>{flags.favorite?"Remove from favorites":"Add to favorites"}</button><button type="button" className="secondary" aria-disabled={guest.pending} aria-pressed={flags.studied} onClick={()=>{if(!guest.pending)void guest.flags(sense.id,{studied:!flags.studied});}}>{flags.studied?"Unmark studied":"Mark as studied"}</button></div>
  <p className="muted small">Studied is your own choice. Viewing, practising and mission completion do not change it.</p>
  <div className="form-list">{FORM_KEYS.map(key=>{const form=sense.forms[key],available=sense.availability[key];return <section className="form-row" key={key}><div className="form-label">{key}</div><div><h3 lang="sv">{available.word?form.word:"Form unavailable"}</h3><p lang="sv">{available.sv?form.sv:"Swedish example unavailable"}</p><p className="translation">{available.en?form.en:"English example unavailable"}</p></div></section>;})}</div>
  <p className="source-note">Supplied source page {sense.page}. Frequency label: {sense.frequency}; the selected learning level is {sense.level}.</p>
 </article>;
}
