import {atomFamily, selectorFamily, useRecoilState} from "recoil"
import {fetchAccountItems} from "../flow/script.get-account-items"
import {IDLE, PROCESSING} from "../global/constants"

export const $state = atomFamily({
  key: "account-items::state",
  default: selectorFamily({
    key: "account-items::default",
    get: address => async () => {
      return fetchAccountItems(address)},
  }),
})

export const $status = atomFamily({
  key: "account-items::status",
  default: IDLE,
})

export function useAccountItems(address) {
  const [items, setItems] = useRecoilState($state(address))
  const [status, setStatus] = useRecoilState($status(address))

  console.log("B")
  console.log(items)

  return {
    ids: items,
    status,

    async mint(recipient, name, 
      imageUrl, color, info, quantity) {
      setStatus(PROCESSING)
      await fetch(process.env.REACT_APP_API_ITEM_MINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: recipient,
          name: name,
          tokenURI: imageUrl,
          color: color,
          info: info,
          quantity: quantity,
        }),
      })
      await fetchAccountItems(recipient).then(setItems)
      setStatus(IDLE)
    },
    async refresh() {
      setStatus(PROCESSING)
      await fetchAccountItems(address).then(setItems)
      setStatus(IDLE)
    },
  }
}
