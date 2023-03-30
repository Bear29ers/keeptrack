/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'arrow-body-style': 'off', // アロー関数の波括弧は必要に応じて記載する
    'no-use-before-define': 'off', // 定義より前に使用しない
    'no-void': 'off', // void演算子の使用を許可しない
    'no-restricted-syntax': [
      // 禁止構文の設定（Enum）
      'error',
      {
        selector: 'TSEnumDeclaration',
        message: 'DO NOT DECLARE ENUM',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }], // .jsxと.tsxを許可する
    'react/jsx-props-no-spreading': 'off', // propsにスプレッド構文を使用しない
    'react/jsx-uses-react': 'off', // importしたReactを使用する
    'react/react-in-jsx-scope': 'off', // Reactをimportする
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }], // 関数コンポーネントのタイプについてのルール、アロー関数のみを設定
    'react/no-unknown-property': 'off', // unknownなプロパティの許容
    'react/display-name': 'off', // コンポーネント定義に表示名が必要（memo）
    'react-hooks/rules-of-hooks': 'error', // react-hooksのルール
    'react-hooks/exhaustive-deps': 'warn', // 依存関係を指定せずに関数を記述する
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-inferrable-types': 'off', // 型推論できる変数宣言初期化は型を書かなくても良い
    '@typescript-eslint/lines-between-class-members': 'off', // クラス定義において、メソッド間に空白行を入れる
    'import/order': [
      'error',
      {
        // グループごとの並び順
        groups: [
          'builtin', // fsやpathなどのnodeの'builtin'モジュール
          'external', // npm installしたパッケージ
          'internal', // webpackなどでパス設定したモジュール
          ['parent', 'sibling'], // 親階層と子階層のファイル
          'object', // オブジェクト（TypeScriptのみ）
          'type', // 型定義のみ（type imports）
          'index', // 同階層のファイル
        ],
        // pathGroupsで扱えないタイプのimportを定義する
        pathGroupsExcludedImportTypes: ['builtin'],
        // アルファベット順、大文字小文字を区別しない
        alphabetize: { order: 'asc', caseInsensitive: true },
        // グループごとに改行を入れる
        'newlines-between': 'always', // 'never'を指定すると改行なし
        // カスタムでルールを定義する
        pathGroups: [
          // react関連をexternalより前にする
          {
            pattern: 'react**',
            group: 'external',
            position: 'before',
          },
          // `@/app`, `@/features/`, `@/libs` のimportをひとグループにしてinternalの前にする
          {
            pattern: '{@/app/**,@/features/**,@/libs/**}',
            group: 'internal',
            position: 'before',
          },
          // `@/components`, `@/pages` の import をグルーピング
          {
            pattern: '{@/components/**,@/pages/**}',
            group: 'internal',
            position: 'before',
          },
          // CSS moduleを一番最後ににする
          {
            pattern: './**.module.css',
            group: 'index',
            position: 'after',
          },
        ],
      },
    ],
    'import/extensions': [
      // import時の拡��子を省略する設定
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'unused-imports/no-unused-imports': 'error', // unused-importsの使用していないimportに対するルール
    'unused-imports/no-unused-vars': [
      // unused-importsのno-unused-varsルール
      'warn',
      {
        vars: 'all', // globalスコープを含め全ての変数をチェックする
        varsIgnorePattern: '^_', // チェックしない変数をRegexpで指定できる。`_`で始まる変数が使用されていなくても許容する
        args: 'after-used', // 引数の使用していない変数に対するチェック。使用している変数が引数の最後の変数であれば、それより前の引数は使用していなくても許容する
        argsIgnorePattern: '^_', // `_`で始まる変数が使用されていなくても許容する
      },
    ],
  },
};
