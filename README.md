# eslint-plugin-switch-case-order

Enforce that case labels in switch statements are sorted

## Installation

```bash
npm install eslint eslint-plugin-switch-case-order --save-dev
```

## Configuration

```javascript
{
    "plugins": ["switch-case-order"],
    "rules": {
        "switch-case-order/switch-case-order": [
        "error",
        "asc",
        { natural: true, caseSensitive: true },
      ],
    }
}
```

## Options

### 1st option

`asc` (default) or `desc`

### 2nd option

2nd option is Object with 2 keys.

- `natural`: Default is `true`. If `false`, this rule forces the case labels to be in unnatural order.
  - natural order: "1", "2", "3", "10"
  - unnatural order: "1", "10", "2", "3"
- `caseSensitive`: Default is `true`. If `false`, this rule forces the case labels to be in case-insensitive order
  - case-sensitive: "A", "a", "b", "c"
  - case-insensitive: "a", "b", "B", "c"

## Note

In `v1.0.0`, `switch-case-order` only applies when the type of case label is string.

## Acknowledgements

The custom rule `switch-case-order` contains options inspired by [sort-keys](https://eslint.org/docs/latest/rules/sort-keys) rule of ESLint.  
I express my gratitude to the contributors of ESlint and sort-keys for their valuable references in the development of this custom rule.

## License

MIT
