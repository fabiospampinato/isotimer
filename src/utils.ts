
/* MAIN */

const sanitizeMs = ( ms: number ): number => {

  //URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout#maximum_delay_value

  return Math.max ( 0, Math.min ( ms, 2_147_483_647 ) );

};

/* EXPORT */

export {sanitizeMs};
