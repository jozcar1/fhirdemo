export const normalizeFHIRResponse = <T = any> (res: any): T[] => {
    if(!res) return [];
    
    if(res.resourceType === 'Bundle'){
        const entries = Array.isArray(res.entry)
      ? res.entry
      : res.entry
        ? [res.entry]
        : [];

        return entries.map((e:any) => e.resource as T);
    }
    return [res as T];

}