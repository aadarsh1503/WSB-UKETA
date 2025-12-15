import React from 'react'
import Hero from '../Hero/Hero'
import UkEtaRequirements from '../UkEtaRequirements/UkEtaRequirements'
import EtaRequirements from '../EtaRequirements/EtaRequirements'
import HowWeHelp from '../HowWeHelp/HowWeHelp'
import EtaDecision from '../EtaDecision/EtaDecision'
import ReadyToApply from '../ReadyToApply/ReadyToApply'

const Home = () => {
  return (
    <div>
      <Hero />
      <UkEtaRequirements />
      <EtaRequirements />
      <HowWeHelp />
      <EtaDecision />
      <ReadyToApply />
    </div>
  )
}

export default Home