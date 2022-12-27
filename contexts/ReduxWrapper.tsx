import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../hooks/redux'
import { changeModelShown } from '../lib/features/model.slice'





export function ReduxWrapper(props :{children : any }) {

  const errorSelector = useAppSelector((state)=> state.error)
  const loadingSelector = useAppSelector((state)=> state.loading)
  const modelSelector = useAppSelector((state)=> state.model)
  const dispatch = useDispatch()

  return (
    <>
      {loadingSelector.isLoading ? 'loading-selector' : null}
      {errorSelector.isError ? 'error-selector' : null}
      {props.children}
    </>
  )
}

export default ReduxWrapper