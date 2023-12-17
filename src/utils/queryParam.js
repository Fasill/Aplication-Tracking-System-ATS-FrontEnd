
export const navigateTab = (props) => {
    const currentUrl = window.location.href;
    const urlWithoutQuery = currentUrl.split('?')[0]; // Get the URL without query parameters
    const newTabParameter = `tab=${props.tab}`;
    const newUrl = `${urlWithoutQuery}?${newTabParameter}`;
    window.location.href = newUrl;
  };
  

export const navigateWithPassword = ()=> {
    const currentUrl = window.location.href;
    const separator = currentUrl.includes('?') ? '&' : '?';
    const newPasswordParameter = '&password=true';
    const newUrl = `${currentUrl}${separator}${newPasswordParameter}`;
    window.location.href = newUrl;

  }