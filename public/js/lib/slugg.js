(function (root) {

var defaultSeparator = '-'

function slugg(string, separator, toStrip) {

  // Separator is optional
  if (typeof separator === 'undefined') separator = defaultSeparator

  // Separator might be omitted and toStrip in its place
  if (separator instanceof RegExp) {
    toStrip = separator
    separator = defaultSeparator
  }

  // Only a separator was passed
  if (typeof toStrip === 'undefined') toStrip = new RegExp('')

  // Swap out non-english characters for their english equivalent
  for (var i = 0, len = string.length; i < len; i++) {
    if (chars[string.charAt(i)]) {
      string = string.replace(string.charAt(i), chars[string.charAt(i)])
    }
  }

  string = string
    // Make lower-case
    .toLowerCase()
    // Strip chars that shouldn't be replaced with separator
    .replace(toStrip, '')
    // Replace non-word characters with separator
    .replace(/[\W|_]+/g, separator)
    // Strip dashes from the beginning
    .replace(new RegExp('^' + separator + '+'), '')
    // Strip dashes from the end
    .replace(new RegExp(separator + '+$'), '')

  return string

}

// Conversion table. Modified version of:
// https://github.com/dodo/node-slug/blob/master/src/slug.coffee
var chars = slugg.chars = {
  // Latin
  'Ã€': 'A', 'Ã': 'A', 'Ã‚': 'A', 'Ãƒ': 'A', 'Ã„': 'A', 'Ã…': 'A', 'Ã†': 'AE',
  'Ã‡': 'C', 'Ãˆ': 'E', 'Ã‰': 'E', 'ÃŠ': 'E', 'Ã‹': 'E', 'ÃŒ': 'I', 'Ã': 'I',
  'ÃŽ': 'I', 'Ã': 'I', 'Ã': 'D', 'Ã‘': 'N', 'Ã’': 'O', 'Ã“': 'O', 'Ã”': 'O',
  'Ã•': 'O', 'Ã–': 'O', 'Å': 'O', 'Ã˜': 'O', 'Ã™': 'U', 'Ãš': 'U', 'Ã›': 'U',
  'Ãœ': 'U', 'Å°': 'U', 'Ã': 'Y', 'Ãž': 'TH', 'ÃŸ': 'ss', 'Ã ': 'a', 'Ã¡': 'a',
  'Ã¢': 'a', 'Ã£': 'a', 'Ã¤': 'a', 'Ã¥': 'a', 'Ã¦': 'ae', 'Ã§': 'c', 'Ã¨': 'e',
  'Ã©': 'e', 'Ãª': 'e', 'Ã«': 'e', 'Ã¬': 'i', 'Ã­': 'i', 'Ã®': 'i', 'Ã¯': 'i',
  'Ã°': 'd', 'Ã±': 'n', 'Ã²': 'o', 'Ã³': 'o', 'Ã´': 'o', 'Ãµ': 'o', 'Ã¶': 'o',
  'Å‘': 'o', 'Ã¸': 'o', 'Ã¹': 'u', 'Ãº': 'u', 'Ã»': 'u', 'Ã¼': 'u', 'Å±': 'u',
  'Ã½': 'y', 'Ã¾': 'th', 'Ã¿': 'y', 'áºž': 'SS', 'Å“': 'oe', 'Å’': 'OE',
  // Greek
  'Î±': 'a', 'Î²': 'b', 'Î³': 'g', 'Î´': 'd', 'Îµ': 'e', 'Î¶': 'z', 'Î·': 'h',
  'Î¸': '8', 'Î¹': 'i', 'Îº': 'k', 'Î»': 'l', 'Î¼': 'm', 'Î½': 'n', 'Î¾': '3',
  'Î¿': 'o', 'Ï€': 'p', 'Ï': 'r', 'Ïƒ': 's', 'Ï„': 't', 'Ï…': 'y', 'Ï†': 'f',
  'Ï‡': 'x', 'Ïˆ': 'ps', 'Ï‰': 'w', 'Î¬': 'a', 'Î­': 'e', 'Î¯': 'i', 'ÏŒ': 'o',
  'Ï': 'y', 'Î®': 'h', 'ÏŽ': 'w', 'Ï‚': 's', 'ÏŠ': 'i', 'Î°': 'y', 'Ï‹': 'y',
  'Î': 'i', 'Î‘': 'A', 'Î’': 'B', 'Î“': 'G', 'Î”': 'D', 'Î•': 'E', 'Î–': 'Z',
  'Î—': 'H', 'Î˜': '8', 'Î™': 'I', 'Îš': 'K', 'Î›': 'L', 'Îœ': 'M', 'Î': 'N',
  'Îž': '3', 'ÎŸ': 'O', 'Î ': 'P', 'Î¡': 'R', 'Î£': 'S', 'Î¤': 'T', 'Î¥': 'Y',
  'Î¦': 'F', 'Î§': 'X', 'Î¨': 'PS', 'Î©': 'W', 'Î†': 'A', 'Îˆ': 'E', 'ÎŠ': 'I',
  'ÎŒ': 'O', 'ÎŽ': 'Y', 'Î‰': 'H', 'Î': 'W', 'Îª': 'I', 'Î«': 'Y',
  // Turkish
  'ÅŸ': 's', 'Åž': 'S', 'Ä±': 'i', 'Ä°': 'I', 'ÄŸ': 'g', 'Äž': 'G',
  // Russian
  'Ð°': 'a', 'Ð±': 'b', 'Ð²': 'v', 'Ð³': 'g', 'Ð´': 'd', 'Ðµ': 'e', 'Ñ‘': 'yo',
  'Ð¶': 'zh', 'Ð·': 'z', 'Ð¸': 'i', 'Ð¹': 'j', 'Ðº': 'k', 'Ð»': 'l', 'Ð¼': 'm',
  'Ð½': 'n', 'Ð¾': 'o', 'Ð¿': 'p', 'Ñ€': 'r', 'Ñ': 's', 'Ñ‚': 't', 'Ñƒ': 'u',
  'Ñ„': 'f', 'Ñ…': 'h', 'Ñ†': 'c', 'Ñ‡': 'ch', 'Ñˆ': 'sh', 'Ñ‰': 'sh', 'ÑŠ': 'u',
  'Ñ‹': 'y', 'Ñ': 'e', 'ÑŽ': 'yu', 'Ñ': 'ya', 'Ð': 'A', 'Ð‘': 'B',
  'Ð’': 'V', 'Ð“': 'G', 'Ð”': 'D', 'Ð•': 'E', 'Ð': 'Yo', 'Ð–': 'Zh', 'Ð—': 'Z',
  'Ð˜': 'I', 'Ð™': 'J', 'Ðš': 'K', 'Ð›': 'L', 'Ðœ': 'M', 'Ð': 'N', 'Ðž': 'O',
  'ÐŸ': 'P', 'Ð ': 'R', 'Ð¡': 'S', 'Ð¢': 'T', 'Ð£': 'U', 'Ð¤': 'F', 'Ð¥': 'H',
  'Ð¦': 'C', 'Ð§': 'Ch', 'Ð¨': 'Sh', 'Ð©': 'Sh', 'Ðª': 'U', 'Ð«': 'Y',
  'Ð­': 'E', 'Ð®': 'Yu', 'Ð¯': 'Ya',
  // Ukranian
  'Ð„': 'Ye', 'Ð†': 'I', 'Ð‡': 'Yi', 'Ò': 'G',
  'Ñ”': 'ye', 'Ñ–': 'i', 'Ñ—': 'yi', 'Ò‘': 'g',
  // Czech
  'Ä': 'c', 'Ä': 'd', 'Ä›': 'e', 'Åˆ': 'n', 'Å™': 'r', 'Å¡': 's',
  'Å¥': 't', 'Å¯': 'u', 'Å¾': 'z', 'ÄŒ': 'C', 'ÄŽ': 'D', 'Äš': 'E',
  'Å‡': 'N', 'Å˜': 'R', 'Å ': 'S', 'Å¤': 'T', 'Å®': 'U', 'Å½': 'Z',
  // Polish
  'Ä…': 'a', 'Ä‡': 'c', 'Ä™': 'e', 'Å‚': 'l', 'Å„': 'n', 'Å›': 's',
  'Åº': 'z', 'Å¼': 'z', 'Ä„': 'A', 'Ä†': 'C', 'Ä˜': 'e', 'Å': 'L',
  'Åƒ': 'N', 'Åš': 'S', 'Å¹': 'Z', 'Å»': 'Z',
  // Latvian
  'Ä': 'a', 'Ä“': 'e', 'Ä£': 'g', 'Ä«': 'i', 'Ä·': 'k', 'Ä¼': 'l',
  'Å†': 'n', 'Å«': 'u', 'Ä€': 'A', 'Ä’': 'E', 'Ä¢': 'G', 'Äª': 'i',
  'Ä¶': 'k', 'Ä»': 'L', 'Å…': 'N', 'Åª': 'u'
}

// Be compatible with different module systems

if (typeof define !== 'undefined' && define.amd) {
  // AMD
  define([], function () {
    return slugg
  })
} else if (typeof module !== 'undefined' && module.exports) {
  // CommonJS
  module.exports = slugg
} else {
  // Script tag
  root.slugg = slugg
}

}(this))
