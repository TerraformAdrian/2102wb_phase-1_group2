import {
  atomFamily,
  selectorFamily,
  useRecoilState,
  useRecoilValue,
} from "recoil"
import {
  LOADING,
  IDLE,
  PROCESSING,
  SUCCESS,
  ERROR,
  IDLE_DELAY,
} from "../global/constants"
import {isAccountInitialized} from "../flow/script.is-account-initialized"
import {initializeAccount} from "../flow/tx.initialize-account"

export const $address = atomFamily({
  key: "init::address",
  default: null,
})

export const $status = atomFamily({
  key: "init::status",
  default: IDLE,
})

export const $init = atomFamily({
  key: "init::state",
  default: selectorFamily({
    key: "init::default",
    get: address => () => isAccountInitialized(address),
  }),
})

export const $computedInit = selectorFamily({
  key: "init::computed",
  get:
    address =>
    async ({get}) => {
      const all = get($init(address))
      return all.HandyItems || all.HandyItemsMarket
    },
})

export function useInitialized(addr) {
  const [address, setAddr] = useRecoilState($address(addr))
  const [init, setInit] = useRecoilState($init(address))
  const isInitialized = useRecoilValue($computedInit(address))
  const [status, setStatus] = useRecoilState($status(address))

  console.log(address)

  function recheck() {
    isAccountInitialized(address).then(setInit)
  }

  return {
    ...init,
    isInitialized,
    status: isInitialized == null ? LOADING : status,
    recheck,
    async initialize(addr) {
      initializeAccount(addr != null ? addr 
        : address, {
        onStart() {
          setStatus(PROCESSING)
        },
        async onSuccess() {
          recheck()
          setStatus(SUCCESS)
        },
        onError() {
          setStatus(ERROR)
        },
        async onComplete() {
          setStatus(IDLE)
        },
      })
    },
    async isSpecificInitialized(address) {
      const all = await isAccountInitialized(address)
      console.log(all)
      setAddr(address)
      return all.HandyItems || all.HandyItemsMarket
    }
  }
}
