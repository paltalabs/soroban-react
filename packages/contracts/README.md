# @soroban-react/contracts

```javascript
import { useContractValue} from '@soroban-react/contracts'
import { useSorobanReact } from '@soroban-react/core'


const balance = useContractValue({ 
        contractId: Constants.TokenId,
        method: 'balance',
        params: [contractIdentifier(Buffer.from(Constants.CrowdfundId, 'hex'))],
        sorobanContext: sorobanContext
    })
```