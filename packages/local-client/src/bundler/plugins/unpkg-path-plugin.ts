import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    // plugin name
    name: 'unpkg-path-plugin',
    // be called automatically
    // `build` is a method in esbuild, here we can overwrite this behavior
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' };
      });

      // handle relative import inside a module
      // if the path includes ./ or ../
      build.onResolve({ filter: /^\.+\// }, async (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        // relative import inside a module
        // import a module
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
