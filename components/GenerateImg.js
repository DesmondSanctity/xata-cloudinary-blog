function cleanText(text) {
    return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}

/**
 * Generates a social sharing image with custom text using Cloudinary’s APIs.
 *
 * @see https://cloudinary.com/documentation/image_transformations#adding_text_captions
 *
 */
export default function generateSocialImage({
    title,
    tagline,
    cloudName,
    imagePublicID,
    cloudinaryUrlBase = 'https://res.cloudinary.com',
    titleFont = 'righteous',
    titleExtraConfig = '',
    taglineExtraConfig = '',
    taglineFont = 'caveat',
    imageWidth = 1280,
    imageHeight = 669,
    textAreaWidth = 760,
    textLeftOffset = 480,
    titleGravity = 'south_west',
    taglineGravity = 'north_west',
    titleLeftOffset = null,
    taglineLeftOffset = null,
    titleBottomOffset = 254,
    taglineTopOffset = 445,
    textColor = 'FFFFFF',
    titleColor,
    taglineColor,
    titleFontSize = 64,
    taglineFontSize = 48,
    version = null,
}) {
    // configure social media image dimensions, quality, and format
    const imageConfig = [
        `w_${imageWidth}`,
        `h_${imageHeight}`,
        'c_fill',
        'q_auto',
        'f_auto',
    ].join(',');

    // configure the title text
    const titleConfig = [
        `w_${textAreaWidth}`,
        'c_fit',
        `co_rgb:${titleColor || textColor}`,
        `g_${titleGravity}`,
        `x_${titleLeftOffset || textLeftOffset}`,
        `y_${titleBottomOffset}`,
        `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${cleanText(
            title,
        )}`,
    ].join(',');

    // configure the tagline text
    const taglineConfig = tagline
        ? [
            `w_${textAreaWidth}`,
            'c_fit',
            `co_rgb:${taglineColor || textColor}`,
            `g_${taglineGravity}`,
            `x_${taglineLeftOffset || textLeftOffset}`,
            `y_${taglineTopOffset}`,
            `l_text:${taglineFont}_${taglineFontSize}${taglineExtraConfig}:${cleanText(
                tagline,
            )}`,
        ].join(',')
        : undefined;

    // combine all the pieces required to generate a Cloudinary URL
    const urlParts = [
        cloudinaryUrlBase,
        cloudName,
        'image',
        'upload',
        imageConfig,
        titleConfig,
        taglineConfig,
        version,
        imagePublicID,
    ];

    // remove any falsy sections of the URL (e.g. an undefined version)
    const validParts = urlParts.filter(Boolean);

    // join all the parts into a valid URL to the generated image
    return validParts.join('/');
}