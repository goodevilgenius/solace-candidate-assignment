# Changes made

`favicon.ico` moved to `public` folder. It currently returns 404, as it is under `src/app`, but, as this is a static resource, it should be under the `public` folder.

`thead` was missing a row.

Replace CSS rules with tailwind classes.

Add type for `Advocate` along with adding explicit types where needed. Correct wrong method used for number type.

Use state for search. Don't use document.getElementById with React.

Move filtering to the server. This will allow for larger datasets.

Add some sensible default styles, particularly by adding in tailwind/typography.
