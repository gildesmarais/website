interface Options {
  message: string;
}

const StarRating = {
  img_tag: function (value: string) {
    return `<img src="/assets/images/stars/${value}" role="presentation" />`;
  },
  star_rating: function (
    string_rating: string,
    { max = 5, divide_by = 2.0 } = {},
  ) {
    const rating = parseFloat(string_rating) / divide_by;

    let whole_stars = Math.floor(rating);
    whole_stars += rating - whole_stars > 0.5 ? 1 : 0;

    const half_star = rating - whole_stars === 0.5 ? 1 : 0;
    const clear_stars = max - (whole_stars + half_star);

    const rating_alt_text = `${rating.toFixed(1)}/${max}`;

    const html_output = [];
    html_output.push(`<div title="${rating_alt_text}" class="star-rating">`);
    html_output.push('<meta itemprop="worstRating" content="0"/>');
    html_output.push(
      `<span class="visually-hidden" itemprop="ratingValue">${rating}</span>`,
    );
    html_output.push('<span class="visually-hidden">/</span>');
    html_output.push(
      `<span class="visually-hidden" itemprop="bestRating">${max}</span>`,
    );
    html_output.push('<span class="visually-hidden">stars</span>');

    for (let i = 0; i < whole_stars; i++) {
      html_output.push(this.img_tag("full.svg"));
    }

    if (half_star === 1) {
      html_output.push(this.img_tag("half.svg"));
    }

    for (let i = 0; i < clear_stars; i++) {
      html_output.push(this.img_tag("clear.svg"));
    }

    html_output.push("</div>");
    return html_output.join("");
  },
};

export default StarRating;
