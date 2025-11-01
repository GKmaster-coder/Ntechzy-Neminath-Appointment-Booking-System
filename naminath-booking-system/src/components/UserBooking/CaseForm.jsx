import React, { useState } from "react";

const CaseForm = ({ formData, onInputChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handler for checkbox groups
  const handleCheckboxChange = (fieldName, value) => {
    const currentValues = formData[fieldName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    
    onInputChange({
      target: {
        name: fieldName,
        value: newValues,
      },
    });
  };

  // Handler for radio buttons
  const handleRadioChange = (fieldName, value) => {
    onInputChange({
      target: {
        name: fieldName,
        value: value,
      },
    });
  };

  return (
    <div className="mt-6">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 hover:bg-gray-200 transition p-3 rounded-md text-left font-semibold text-[#222]"
      >
        Case Form (Optional)
        <span className="float-right text-lg">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Collapsible section */}
      {isOpen && (
        <div className="mt-3 space-y-6 border p-4 rounded-lg bg-gray-50 max-h-[600px] overflow-y-auto">
          
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                Current Height
              </label>
              <input
                type="text"
                name="currentHeight"
                value={formData.currentHeight || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 5'8&quot;"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                Current Weight
              </label>
              <input
                type="text"
                name="currentWeight"
                value={formData.currentWeight || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 70 kg"
              />
            </div>
          </div>

          {/* Chief Complaint */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-1">
              Condition for which you are seeking homeopathic treatment <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-600 mb-2">
              (please list all issues you would like to address, we will address these and more during your appointment)
            </p>
            <textarea
              name="chiefComplaint"
              value={formData.chiefComplaint || ""}
              onChange={onInputChange}
              rows="3"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Please list all issues you would like to address"
            />
          </div>

          {/* Fetal / Birth / Young Life Information */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Fetal / Birth / Young Life Information</h3>
            
            <p className="text-sm text-gray-700 mb-3">
              Please state (if known) the health of your mother when she was pregnant with you:
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#222] mb-2">
                Did your mother suffer from:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Anemia', 'High blood pressure', 'High blood sugar', 'Toxemia', 'Diabetes', 
                  'Low blood pressure', 'Vomiting', 'Emotional trauma', 'Physical trauma', 
                  'Jaundice', 'Anger/Insult/Grief', 'Other complication', 'Hypothyroidism',
                  'Previously Abortion/Miscarriage', 'Forceps', 'Congenital anomaly'].map((condition) => (
                  <label key={condition} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(formData.maternalHealth || []).includes(condition)}
                      onChange={() => handleCheckboxChange('maternalHealth', condition)}
                      className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {condition}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#222] mb-1">
                Please describe any other issues that arose with your mother's pregnancy:
              </label>
              <textarea
                name="maternalIssues"
                value={formData.maternalIssues || ""}
                onChange={onInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* C-Sections */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-2">C-Sections</label>
            <div className="flex flex-wrap gap-4">
              {['Breech', 'Cord tie', 'Meconium ingestion'].map((option) => (
                <label key={option} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="cSections"
                    value={option}
                    checked={formData.cSections === option}
                    onChange={() => handleRadioChange('cSections', option)}
                    className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Birth Information */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-2">Regarding your birth:</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
              {['Average', 'Caesarean', 'Long/ difficult', 'Delayed', 'Breech', 
                'Forceps used', 'Premature'].map((option) => (
                <label key={option} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="birthType"
                    value={option}
                    checked={formData.birthType === option}
                    onChange={() => handleRadioChange('birthType', option)}
                    className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  {option}
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  What was the weight of the infant at the time of birth?
                </label>
                <input
                  type="text"
                  name="birthWeight"
                  value={formData.birthWeight || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 3.2 kg"
                />
              </div>
            </div>
          </div>

          {/* Breast Feeding */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-2">Were you breast-fed?</label>
            <div className="flex gap-4 mb-2">
              {['Yes', 'No'].map((option) => (
                <label key={option} className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="breastFed"
                    value={option}
                    checked={formData.breastFed === option}
                    onChange={() => handleRadioChange('breastFed', option)}
                    className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  {option}
                </label>
              ))}
            </div>
            
            {formData.breastFed === 'Yes' && (
              <div className="mt-2">
                <label className="block text-sm text-[#222] mb-1">
                  If yes, for approximately how long?
                </label>
                <input
                  type="text"
                  name="breastFedDuration"
                  value={formData.breastFedDuration || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 6 months, 1 year"
                />
              </div>
            )}
          </div>

          {/* Good Baby */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-1">
              Were you a "good" baby?
            </label>
            <input
              type="text"
              name="goodBaby"
              value={formData.goodBaby || ""}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Cry a lot */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-1">
              Or did you cry a lot? If so, why?
            </label>
            <input
              type="text"
              name="cryLot"
              value={formData.cryLot || ""}
              onChange={onInputChange}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Development Milestones */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-[#222] mb-2">
              At which ages did you develop:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#222] mb-1">Teeth</label>
                <input
                  type="text"
                  name="teethAge"
                  value={formData.teethAge || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age in months"
                />
              </div>
              <div>
                <label className="block text-xs text-[#222] mb-1">Ability to crawl</label>
                <input
                  type="text"
                  name="crawlAge"
                  value={formData.crawlAge || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age in months"
                />
              </div>
              <div>
                <label className="block text-xs text-[#222] mb-1">Ability to walk</label>
                <input
                  type="text"
                  name="walkAge"
                  value={formData.walkAge || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age in months"
                />
              </div>
              <div>
                <label className="block text-xs text-[#222] mb-1">Ability to talk</label>
                <input
                  type="text"
                  name="talkAge"
                  value={formData.talkAge || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age in months"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm text-[#222] mb-1">
                If you are unsure, do you know if these events occurred within the standard age frames?
              </label>
              <input
                type="text"
                name="milestonesNormal"
                value={formData.milestonesNormal || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Illness History */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Illness History</h3>
            <p className="text-sm text-[#222] mb-3">
              If you have been affected by any of the following, please indicate approximately what age you were, and if it was severe or long-lasting.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {['Chicken pox', 'Mumps', 'German measles', 'Pneumonia', 'Measles', 'Scarlet fever',
                'Mononucleosis', 'Whooping cough', 'Typhoid', 'Accident/Injury', 'Dengue', 'Animal Bite',
                'Malaria', 'Surgical History'].map((illness) => (
                <div key={illness}>
                  <label className="block text-xs font-medium text-[#222] mb-1">{illness}</label>
                  <input
                    type="text"
                    name={`illness_${illness.replace(/\s+/g, '_').toLowerCase()}`}
                    value={formData[`illness_${illness.replace(/\s+/g, '_').toLowerCase()}`] || ""}
                    onChange={onInputChange}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Age / severity"
                  />
                </div>
              ))}
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-[#222] mb-1">
                Other illnesses
              </label>
              <textarea
                name="otherIllnesses"
                value={formData.otherIllnesses || ""}
                onChange={onInputChange}
                rows="2"
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Recurring Issues */}
          <div>
            <label className="block text-sm font-medium text-[#222] mb-2">
              Have you suffered from recurring:
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['Boils', 'Boils', 'Ear infections', 'Tonsillitis/Throat issues', 'Colds', 'Polyps',
                'Tumors', 'Coughs/chest issues', 'Skin disorders', 'Urinary tract infection',
                'Cysts', 'Stomach "bugs"', 'Warts', 'Yeast infections'].map((issue) => (
                <label key={issue} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={(formData.recurringIssues || []).includes(issue)}
                    onChange={() => handleCheckboxChange('recurringIssues', issue)}
                    className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {issue}
                </label>
              ))}
            </div>
          </div>

          {/* Vaccinations */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Vaccinations</h3>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-[#222] mb-2">
                Have you had reactions to any vaccinations?
              </label>
              <div className="flex gap-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="vaccinationReactions"
                      value={option}
                      checked={formData.vaccinationReactions === option}
                      onChange={() => handleRadioChange('vaccinationReactions', option)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-[#222] mb-2">
                Did your health decline after a vaccination?
              </label>
              <div className="flex gap-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="healthDeclineVaccination"
                      value={option}
                      checked={formData.healthDeclineVaccination === option}
                      onChange={() => handleRadioChange('healthDeclineVaccination', option)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222] mb-2">
                Have you had allergy desensitization injections?
              </label>
              <div className="flex gap-4">
                {['Yes', 'No'].map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="allergyDesensitization"
                      value={option}
                      checked={formData.allergyDesensitization === option}
                      onChange={() => handleRadioChange('allergyDesensitization', option)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Family Health History */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Family Health History</h3>
            <p className="text-sm text-[#222] mb-3">
              Indicate in the following chart which ailments have affected your relatives—including those living and those who have passed (to the best of your ability).
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Relation</th>
                    <th className="border border-gray-300 p-2 text-left">Age if alive</th>
                    <th className="border border-gray-300 p-2 text-left">Age at passing</th>
                    <th className="border border-gray-300 p-2 text-left">Ailments</th>
                  </tr>
                </thead>
                <tbody>
                  {['Mother', 'Father', 'Siblings', 'Maternal Grandmother', 'Maternal Grandfather', 
                    'Maternal Aunts/Uncles', 'Paternal Grandmother', 'Paternal Grandfather', 
                    'Paternal Aunts/Uncles'].map((relation) => (
                    <tr key={relation}>
                      <td className="border border-gray-300 p-2 font-medium">{relation}</td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name={`family_${relation.replace(/\s+/g, '_').toLowerCase()}_age`}
                          value={formData[`family_${relation.replace(/\s+/g, '_').toLowerCase()}_age`] || ""}
                          onChange={onInputChange}
                          className="w-full border-0 p-1 text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name={`family_${relation.replace(/\s+/g, '_').toLowerCase()}_passing`}
                          value={formData[`family_${relation.replace(/\s+/g, '_').toLowerCase()}_passing`] || ""}
                          onChange={onInputChange}
                          className="w-full border-0 p-1 text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        <input
                          type="text"
                          name={`family_${relation.replace(/\s+/g, '_').toLowerCase()}_ailments`}
                          value={formData[`family_${relation.replace(/\s+/g, '_').toLowerCase()}_ailments`] || ""}
                          onChange={onInputChange}
                          className="w-full border-0 p-1 text-sm focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Significant Life Events */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Significant Life Events:</h3>
            <p className="text-sm text-[#222] mb-3">
              This portion is optional; complete only if you would like to.
            </p>
            <p className="text-sm text-[#222] mb-3">
              Traumatic events can impact your health. Discussing them can often be difficult. It is not necessary for us to discuss the details of these events. However, it is very helpful to know what the effects of the events were, how they left you feeling after the event, etc. If you would like to, you can review them in person.
            </p>
            <p className="text-sm text-[#222] mb-3">
              If you are able, please complete a timeline from birth to present. Situations such as: traumas of your mother during pregnancy with you, romantic disappointments, divorces, work issues, family issues, death of loved ones, humiliations/embarrassments, and other events that have impacted you. Please include on this timeline dates of major illness and onset of physical or emotional issues, including conditions that were treated with suppressive medications.
            </p>
            <textarea
              name="significantEvents"
              value={formData.significantEvents || ""}
              onChange={onInputChange}
              rows="4"
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Include positive events such as marriages and birth of children. Use a separate sheet, other side of a page, or the end of this form."
            />
            
            <div className="mt-3">
              <label className="block text-sm font-medium text-[#222] mb-1">
                If you are unsure, do you know if these events occurred within the standard age frames?
              </label>
              <input
                type="text"
                name="ageFramesUnsure"
                value={formData.ageFramesUnsure || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Explain your: Childhood */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Explain your:-</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-[#222] mb-2">Childhood</label>
              <div className="flex flex-wrap gap-4">
                {['Pleasant', 'Pleasant', 'Specific Fear during childhood'].map((option) => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="childhoodNature"
                      value={option}
                      checked={formData.childhoodNature === option}
                      onChange={() => handleRadioChange('childhoodNature', option)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-[#222] mb-2">Nature</label>
              <p className="text-sm text-gray-700 mb-2">a. Reaction during anger: If expressed explain how</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                {['Throwing things', 'Shouting', 'Sitting alone', 'Avoiding food', 'Abusing/Fighting'].map((reaction) => (
                  <label key={reaction} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      checked={(formData.angerReaction || []).includes(reaction)}
                      onChange={() => handleCheckboxChange('angerReaction', reaction)}
                      className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    {reaction}
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 mb-3">
                {['Introverted/Extroverted', 'Like to be alone or enjoys company'].map((trait) => (
                  <label key={trait} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="personalityTrait"
                      value={trait}
                      checked={formData.personalityTrait === trait}
                      onChange={() => handleRadioChange('personalityTrait', trait)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {trait}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Life Phases */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                Most pleasant time of life-
              </label>
              <input
                type="text"
                name="pleasantTime"
                value={formData.pleasantTime || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                A struggling time of life-
              </label>
              <input
                type="text"
                name="strugglingTime"
                value={formData.strugglingTime || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                Most painful time of life-
              </label>
              <input
                type="text"
                name="painfulTime"
                value={formData.painfulTime || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222] mb-1">
                Hobbies-
              </label>
              <input
                type="text"
                name="hobbies"
                value={formData.hobbies || ""}
                onChange={onInputChange}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#222] mb-2">Stress factor</label>
              <div className="flex flex-wrap gap-4">
                {['Family', 'Professional', 'Personal', 'Any other'].map((factor) => (
                  <label key={factor} className="flex items-center text-sm">
                    <input
                      type="radio"
                      name="stressFactor"
                      value={factor}
                      checked={formData.stressFactor === factor}
                      onChange={() => handleRadioChange('stressFactor', factor)}
                      className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    {factor}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Symptoms / Pain */}
          <div className="border-t pt-4">
            <h3 className="font-semibold text-[#222] mb-3">Check all boxes that describe the symptoms/ pain:</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {['Aching', 'Drawing/pulling', 'Pressure inwards', 'Biting', 'Dull', 'Pressure outwards',
                'Boring', 'Electric- like', 'Pulsating', 'Bruised', 'Gripping', 'Shooting',
                'Burning', 'Jerking', 'Sore', 'Bursting', 'Like a cut', 'Cramping', 'Like a plug is stuck',
                'Stinging', 'Cutting', 'Like a splinter/ nail is stuck', 'Tearing', 'Digging', 'Pinching',
                'Throbbing', 'Like a rock', 'Stupefying'].map((symptom) => (
                <label key={symptom} className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={(formData.painSymptoms || []).includes(symptom)}
                    onChange={() => handleCheckboxChange('painSymptoms', symptom)}
                    className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {symptom}
                </label>
              ))}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  What makes the pain/ symptom better (ex. Heat, cold, motion, being still, menstrual cycle, full moon, sitting, lying, going up steps, running, motion, walking, emotions, etc.)
                </label>
                <textarea
                  name="symptomBetter"
                  value={formData.symptomBetter || ""}
                  onChange={onInputChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  What makes symptoms worse?
                </label>
                <textarea
                  name="symptomWorse"
                  value={formData.symptomWorse || ""}
                  onChange={onInputChange}
                  rows="2"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  Is there a specific time of day that your symptoms are worse?
                </label>
                <input
                  type="text"
                  name="symptomTimeOfDay"
                  value={formData.symptomTimeOfDay || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222] mb-2">
                  Do you have pain/ symptoms on a daily basis?
                </label>
                <div className="flex gap-4">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center text-sm">
                      <input
                        type="radio"
                        name="dailySymptoms"
                        value={option}
                        checked={formData.dailySymptoms === option}
                        onChange={() => handleRadioChange('dailySymptoms', option)}
                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  Where do you feel it? (location)
                </label>
                <input
                  type="text"
                  name="symptomLocation"
                  value={formData.symptomLocation || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#222] mb-1">
                  Does the pain extend to another location? If so, where?
                </label>
                <input
                  type="text"
                  name="symptomExtend"
                  value={formData.symptomExtend || ""}
                  onChange={onInputChange}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CaseForm;
