/** Chapter 9: Regular Expressions */

/** Question 1: Regexp Golf */

/** Match car and cat */

regext = /ca[tr]/;
regext.match("car");

/** Match pop and prop */

regext = /pr?op/;

/** Match ferret, ferry and ferrari */

regext = /ferr(et|y|ari)/

/** Match any word ending in ious */

regext = /\w+ious\b/

/** A whitespace character followed by a period, comma, colon, or semicolon */

regext = /\s[.,;:]/

/** A word longer than 6 letters */

regext = /\b\w{6,}\b/

/** A word without the letter e (or E) */

regext = /\b[^eE]\b/