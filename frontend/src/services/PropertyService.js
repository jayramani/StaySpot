export async function getAllProperties() {

    try{
        const response = await fetch('/properties');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function getProperty(data) {
    const response = await fetch(`/properties`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

export async function createProperty(data) {
    const response = await fetch(`/properties`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}