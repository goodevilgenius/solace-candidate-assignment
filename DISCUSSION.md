# Discusion

## Changes made

`favicon.ico` moved to `public` folder. It currently returns 404, as it is under `src/app`, but, as this is a static resource, it should be under the `public` folder.

`thead` was missing a row.

Replace CSS rules with tailwind classes.

Add type for `Advocate` along with adding explicit types where needed. Correct wrong method used for number type.

Use state for search. Don't use document.getElementById with React.

Move filtering to the server. This will allow for larger datasets.

Add some sensible default styles, particularly by adding in tailwind/typography.

## Changes not made, but would be useful

The /api/advocates route should be able to paginated, and pagination controls should be added to the UI. I introduced that be adding a limit, although that's not currently controllable through the UI.

A useful response from that endpoint would be something like:

```json
{
    "data": [/* as it is currently*/],
    "count": /* number of items in response */,
    "total": /* total number of items for query */,
    "page": 1,
    "per_page": 20
}
```

In the front-end, the "Specialties" column is particularly difficult to read. A different approach is necessary, although I'm not certain the best method. Possibly using ellipses to hide more than three lines, and allow it to be expanded.
