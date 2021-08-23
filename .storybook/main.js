module.exports = {
    stories: [
        '../guides/Overview.stories.mdx',
        '../src/**/*.stories.@(js|mdx)'
    ],
    addons: [
        '@storybook/addon-knobs',
        '@storybook/addon-actions/register',
        {
            name: '@storybook/addon-docs',
            options: {
                configureJSX: true,
                babelOptions: {},
                sourceLoaderOptions: null,
            },
        },
    ]
};