enum ProcessStatus { Pending, ReviewerAssigned, EditorRejected, ReviewerRejected, AppendReviewer, NeedRevise, RepliedNew, Published }
  
  
export function useStatus() {
    return { ProcessStatus }
}