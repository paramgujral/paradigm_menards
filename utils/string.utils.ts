export const ensureEndsWith = (source:string, ending:string):string => {
  if(!source.endsWith(ending)){
    return source + ending;
  }
  return source;
}

export const ensureStartsWith = (source:string, starting:string):string => {
  if(!source.startsWith(starting)){
    return starting + source;
  }
  return source;
}

export const ensureDoesNotEndWith = (source:string, ending:string):string => {
  let tempSource = source;
  while(tempSource.endsWith(ending)){
    tempSource = tempSource.substring(0,tempSource.length - ending.length);
  }
  return tempSource;
}

export const ensureDoesNotStartWith = (source:string, starting:string):string => {
  let tempSource = source;
  while(tempSource.startsWith(starting)){
    tempSource = tempSource.substring(starting.length);
  }
  return tempSource;
}