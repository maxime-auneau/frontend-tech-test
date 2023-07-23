export const getComponentData = (components: Array<any>, componentType: string) => {
  const component = components.find((component) => component._kenticoItemType === componentType);
  if (component) {
    return component;
  }
};

export const getWebConfigData = (webConfig: any, webConfigName: string) => {
  const webConfigData = webConfig[webConfigName];
  if (webConfigData) {
    return webConfigData;
  }
};
