import React from 'react';
import { InfScrollCompDiv } from './InfScrollCompDiv';
// import { InfScrollCompTable } from './InfScrollCompTable';
// import { InfScrollDiv } from './InfScrollDiv';
import { useCompanyList } from './useCompanyList';

function App() {
    // List of all companies
    const { loading, error, companies } = useCompanyList();

    // Allow ErrorBoundary to handle errors
    if (error) {
        throw error;
    }

    if (loading) {
        return null;
    }

    return (
        <div>
            <InfScrollCompDiv companies={companies} />
        </div>
    );
}

export default App;
