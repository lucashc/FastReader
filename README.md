# FastReader
FastReader is a tool that enables humans to achieve great reading speeds. It works by showing words of sentences with large frequency at the same spot. This allows the user to read without the need to move the eyes. A typical person reads from paper or screen at 250 to 300 words per minute (WPM). Here are some reading speeds outlined with their level of comprehensibility for the user:

| WPM | Level of comprehensibility      |
| --- | --------------------------      |
| 200 | Integral                        |
| 400 | Full                            |
| 600 | Intermediate                    |
| 800 | Broadly                         |
| 900 | Physical limit - Less broadly   |

Even at the physical limit the text is still intelligible and it feels afterwards as if a quick summary was read.

## Build the extension
To package the extension, run: `make package`. This will result in `extension.xpi`.

This extension utilises the WebExtension API, so it should be compatible with the major browser. However, this extension was only tested on Firefox.
