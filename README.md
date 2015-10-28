# hivequiz
Simple HTML/JS quiz app

###### To deploy:
1. Add your images to the directory or to a subdirectory (e.g., underneath img/)
2. In a newly created directory "res/", create a plain text file named "hivequiz.txt"
3. To the res/hivequiz.txt file, add a line for each available image containing csv records, comma-separated:
  * the name of the image, including subdirectory name if needed
  * the solution text

  For example:
  ```
  img/image01.png,thingamajig
  ```

This does not need to be served from a webserver, it can easily run from a local filesystem.
Just choose "open location" / "open file" from a browser window (commonly bound to the ctrl+o shortcut in desktop browsers) and point it to the html page.
